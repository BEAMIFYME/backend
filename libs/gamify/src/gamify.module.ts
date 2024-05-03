import { Module } from '@nestjs/common';
import { GamifyService } from './gamify.service';

@Module({
  providers: [GamifyService],
  exports: [GamifyService],
})
export class GamifyModule {}
