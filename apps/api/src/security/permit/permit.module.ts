import { Module } from '@nestjs/common';
import { Permit } from './permit';

@Module({
  providers: [Permit],
  exports: [Permit],
})
export class PermitModule {}
