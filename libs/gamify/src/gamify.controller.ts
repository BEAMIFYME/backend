import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { GamifyService } from './gamify.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateGamifyDto } from 'apps/api/src/database/dto/createGamify.dto';

@ApiTags('Gamification Management')
@Controller('gamify')
export class GamifyController {
  constructor(private readonly gamifyService: GamifyService) {}

  @Get()
  findAll() {
    return this.gamifyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamifyService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateGamifyDto: UpdateGamifyDto) {
    return this.gamifyService.update(id, updateGamifyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gamifyService.remove(id);
  }
}
