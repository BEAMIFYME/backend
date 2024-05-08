import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { DiscordController } from './discord.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discord } from './entities/discord.entity';
import { DiscordStrategy } from '../../strategies/discord.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Discord])],
  controllers: [DiscordController],
  providers: [DiscordService, DiscordStrategy],
  exports: [DiscordService],
})
export class DiscordModule {}
