import { Module } from '@nestjs/common';
import { GamifyService } from './gamify.service';
import { GamifyController } from './gamify.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gamify } from 'apps/api/src/database/entities/gamify.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gamify])],
  controllers: [GamifyController],
  providers: [GamifyService],
  exports: [GamifyService],
})
export class GamifyModule {}
