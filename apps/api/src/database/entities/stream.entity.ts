import { BaseEntity } from '../base/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from '../../api/users/entities/user.entity';

@Entity()
export class Stream extends BaseEntity {
  @Column('varchar', {
    name: 'streamTitle',
    length: 255,
    default: 'This is a dummy title',
  })
  streamTitle: string;
  @Column('varchar', {
    name: 'streamDescription',
    length: 255,
    default: 'This is a dummy description',
  })
  streamDescription: string;
  @Column('varchar', {
    name: 'streamUrl',
    length: 255,
    nullable: true,
  })
  streamUrl: string;
  @Column('varchar', {
    name: 'streamThumbnail',
    length: 255,
    default: 'https://i.postimg.cc/D08fC2VJ/av-logo.png',
  })
  streamThumbnail: string;
  @Column('varchar', {
    name: 'streamLanguage',
    length: 255,
    default: 'en',
  })
  streamLanguage: string;
  @Column('varchar', {
    name: 'streamKey',
    length: 512,
    default: 'stream-key',
  })
  streamKey: string;

  @Column({ name: 'isLive', default: false })
  isLive: boolean;

  @OneToOne(() => User, (user) => user.stream)
  @JoinColumn()
  user: User;
}
