import { Module } from '@nestjs/common';
import { BeamifyService } from './beamify.service';
import { BeamifyController } from './beamify.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Stream } from 'apps/api/src/database/entities/stream.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stream]), HttpModule],
  controllers: [BeamifyController],
  providers: [BeamifyService],
  exports: [BeamifyService],
})
export class BeamifyModule {}
