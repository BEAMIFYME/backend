import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { Claims } from './entities/claims.entity';
import { Stream } from '../../database/entities/stream.entity';
import { GamifyModule } from '@gamification/gamify';
import { BeamifyModule } from '@mediaengine/beamify';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile, Claims, Stream]),
    GamifyModule,
    BeamifyModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
