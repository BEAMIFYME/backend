import { CreateProfileDto } from './create-profile.dto';
import { CreateClaimsDto } from './create-claims.dto';
import { Stream } from '../../../database/entities/stream.entity';
import { Gamify } from '../../../database/entities/gamify.entity';

export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  profile: CreateProfileDto;
  claims: CreateClaimsDto;
  stream: Stream;
  gamify: Gamify;
}
