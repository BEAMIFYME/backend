import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TwitterService } from './twitter.service';
import { CreateTwitterDto } from './dto/create-twitter.dto';
import { UpdateTwitterDto } from './dto/update-twitter.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Twitter Management')
@Controller('twitter')
export class TwitterController {
  constructor(private readonly twitterService: TwitterService) {}

}
