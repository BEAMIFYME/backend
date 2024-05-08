import { PartialType } from '@nestjs/swagger';
import { User } from '../../api/users/entities/user.entity';

export class CreateGamifyDto {
  loyaltyPoints: number;
  totalSpent: number;
  totalEarned: number;
  user: User;
}

export class UpdateGamifyDto extends PartialType(CreateGamifyDto) {}
