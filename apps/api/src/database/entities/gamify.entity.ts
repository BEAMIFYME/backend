import { BaseEntity } from '../base/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from '../../api/users/entities/user.entity';

@Entity()
export class Gamify extends BaseEntity {
  @Column({ default: 0, nullable: true })
  loyaltyPoints: number;
  @Column({ default: 0, nullable: true })
  totalSpent: number;
  @Column({ default: 0, nullable: true })
  totalEarned: number;

  @OneToOne(() => User, (user) => user.gamify)
  @JoinColumn()
  user: User;
}
