import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../database/base/base.entity';
import { User } from './user.entity';

@Entity()
export class Profile extends BaseEntity {
  @Column({
    default: 'This is your bio, you really should update it',
  })
  bio: string;
  @Column({
    default: 'https://i.postimg.cc/qMR4Vwzn/beamify.png',
  })
  avatar: string;
  @Column({
    default: 'https://i.postimg.cc/bvjRDwvz/default.png',
  })
  cover: string;
  @Column({
    default: 'No location set',
  })
  location: string;
  @Column({
    default: 'No website set',
  })
  website: string;
  @Column({
    nullable: true,
  })
  birthdate: Date;
  @Column({ default: 'Firstname' })
  firstName: string;
  @Column({ default: 'Lastname' })
  lastName: string;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  user: User;
}
