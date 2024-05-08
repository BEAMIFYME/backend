import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { BeamifyService } from './beamify.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Beamify Media Management')
@Controller('beamify')
export class BeamifyController {
  constructor(private readonly beamifyService: BeamifyService) {}

  @Post('live/admission')
  async admission(
    @Body() body: any,
    @Req() request: Request, // Get the entire request object
    @Res() res: Response, // Inject the response object
  ): Promise<any> {
    return this.beamifyService.admission(body, request, res);
  }

  @Post('live/transcode')
  transcode(@Body() requestBody: any) {
    return this.beamifyService.processTranscodeRequest(requestBody);
  }

  @Post('start/:streamKey')
  startStream(@Param('streamKey') streamKey: string) {
    return this.beamifyService.startStream(streamKey);
  }

  @Post('stop/:streamKey')
  stopStream(@Param('streamKey') streamKey: string) {
    return this.beamifyService.stopStream(streamKey);
  }

  @Post('recording/:vhostName/:appName/:command')
  toggleRecording(
    @Param('vhostName') vhostName: string,
    @Param('appName') appName: string,
    @Param('command') command: 'start' | 'stop',
  ) {
    return this.beamifyService.toggleRecording(vhostName, appName, command);
  }

  @Post('push/:vhostName/:appName')
  pushStream(
    @Param('vhostName') vhostName: string,
    @Param('appName') appName: string,
    @Body('pushUrl') pushUrl: string,
  ) {
    return this.beamifyService.pushStream(vhostName, appName, pushUrl);
  }

  @Get('streams/:vhostName/:appName')
  getStreams(
    @Param('vhostName') vhostName: string,
    @Param('appName') appName: string,
  ) {
    return this.beamifyService.getStreams(vhostName, appName);
  }

  @Get('statistics/current')
  getCurrentStatistics() {
    return this.beamifyService.getCurrentStatistics();
  }
}
