import { Module } from '@nestjs/common';
import { TwitchService } from './twitch.service';
import { TwitchController } from './twitch.controller';
import { TwitchStrategy } from '../../strategies/twitch.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Twitch } from './entities/twitch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Twitch])],
  controllers: [TwitchController],
  providers: [TwitchService, TwitchStrategy],
  exports: [TwitchService],
})
export class TwitchModule {}
