import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Stream } from 'apps/api/src/database/entities/stream.entity';
import { User } from 'apps/api/src/api/users/entities/user.entity';

@Injectable()
export class BeamifyService {
  constructor(
    @InjectRepository(Stream) public streamRepository: Repository<Stream>,
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  async findByStreamKey(streamKey: string): Promise<Stream> {
    if (!streamKey) throw new Error('Stream key not provided');
    return this.streamRepository.findOne({
      where: { streamKey },
      relations: ['user'],
    });
  }

  async admission(body: any, request: any, res: any): Promise<any> {
    // Extract the streamKey from the URL
    const url = new URL(body.request.url);
    const streamKey = url.pathname.split('/').pop();

    const stream = await this.findByStreamKey(streamKey);
    if (!stream) {
      return res.status(200).json({ allowed: false });
    }

    // Check the status of the request to determine if the stream is going online or offline
    if (body.request.status === 'opening') {
      // The stream is going online
      stream.isLive = true;
    } else if (body.request.status === 'closing') {
      // The stream is going offline
      stream.isLive = false;
    }
  }

  async create(user: User) {
    const newStream = new Stream();
    // Generate signed policy for the stream
    // Set the stream key (signed policy) to streamKey attribute
    newStream.streamKey = this.generateStreamKey();

    newStream.user = user;

    // Save the stream to the database
    return await this.streamRepository.save(newStream);
  }

  private generateStreamKey(): string {
    const timestamp = Date.now();
    const secret = this.configService.get('OME_SECRET');
    return crypto
      .createHmac('sha256', secret)
      .update(String(timestamp))
      .digest('hex');
  }

  async processTranscodeRequest(requestBody: any): Promise<any> {
    // Process the request from OME and generate the response
    // This is where you would implement your business logic
    // For now, let's just return a hardcoded response
    return {
      allowed: true,
      reason: "it will be output to the log file when 'allowed' is false",
      outputProfiles: {
        hardwareAcceleration: true,
        outputProfile: [
          // ... your output profiles here ...
        ],
      },
    };
  }

  // WebRTC
  async startStream(streamKey: string): Promise<any> {
    const url = `${this.configService.get('OME_URL')}/start/${streamKey}`;
    const headers = { AccessToken: this.configService.get('OME_KEY') };

    const response = await this.httpService
      .post(url, {}, { headers })
      .toPromise();
    return response.data;
  }

  async stopStream(streamKey: string): Promise<any> {
    const url = `${this.configService.get('OME_URL')}/stop/${streamKey}`;
    const headers = { AccessToken: this.configService.get('OME_KEY') };

    const response = await this.httpService
      .post(url, {}, { headers })
      .toPromise();
    return response.data;
  }

  async toggleRecording(
    vhostName: string,
    appName: string,
    command: 'start' | 'stop',
  ): Promise<any> {
    const url = `${this.configService.get('OME_URL')}/v1/virtualhost/${vhostName}/app/${appName}/recording`;
    const headers = { AccessToken: this.configService.get('OME_KEY') };
    const body = { command };

    const response = await this.httpService
      .post(url, body, { headers })
      .toPromise();
    return response.data;
  }

  async pushStream(
    vhostName: string,
    appName: string,
    pushUrl: string,
  ): Promise<any> {
    const url = `${this.configService.get('OME_URL')}/v1/virtualhost/${vhostName}/app/${appName}/push`;
    const headers = { AccessToken: this.configService.get('OME_KEY') };
    const body = { url: pushUrl };

    const response = await this.httpService
      .post(url, body, { headers })
      .toPromise();
    return response.data;
  }

  async getStreams(vhostName: string, appName: string): Promise<any> {
    const url = `${this.configService.get('OME_URL')}/v1/virtualhost/${vhostName}/app/${appName}/stream`;
    const headers = { AccessToken: this.configService.get('OME_KEY') };

    const response = await this.httpService.get(url, { headers }).toPromise();
    return response.data;
  }

  async getCurrentStatistics(): Promise<any> {
    const url = `${this.configService.get('OME_URL')}/v1/statistics/current`;
    const headers = { AccessToken: this.configService.get('OME_KEY') };

    const response = await this.httpService.get(url, { headers }).toPromise();
    return response.data;
  }
}
