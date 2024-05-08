import { Injectable } from '@nestjs/common';
import { CreateDiscordDto } from './dto/create-discord.dto';
import { UpdateDiscordDto } from './dto/update-discord.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Discord } from './entities/discord.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DiscordService {
  constructor(
    @InjectRepository(Discord) private discordRepository: Repository<Discord>,
  ) {}


}
