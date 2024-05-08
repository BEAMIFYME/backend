import { PartialType } from '@nestjs/swagger';
import { User } from '../../api/users/entities/user.entity';

export class CreateStreamDto {
  streamTitle: string;
  streamDescription: string;
  streamUrl: string;
  streamThumbnail: string;
  streamKey: string;
  isLive: boolean;
  user: User;
}

export class UpdateStreamDto extends PartialType(CreateStreamDto) {}
