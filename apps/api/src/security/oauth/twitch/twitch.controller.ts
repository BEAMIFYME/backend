import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TwitchService } from './twitch.service';
import { CreateTwitchDto } from './dto/create-twitch.dto';
import { UpdateTwitchDto } from './dto/update-twitch.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Twitch Management')
@Controller('twitch')
export class TwitchController {
  constructor(private readonly twitchService: TwitchService) {}

}
