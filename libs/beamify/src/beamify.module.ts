import { Module } from '@nestjs/common';
import { BeamifyService } from './beamify.service';

@Module({
  providers: [BeamifyService],
  exports: [BeamifyService],
})
export class BeamifyModule {}
