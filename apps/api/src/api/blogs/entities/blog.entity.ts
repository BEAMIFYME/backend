import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from '../../../database/base/base.entity';
import { Article } from './article.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Blog extends BaseEntity {
  @Column({ unique: true, nullable: true })
  blogName: string;
  @Column({ nullable: true })
  blogDescription: string;

  @Column({ default: false })
  isBlogger: boolean;

  @OneToMany(() => Article, (article) => article.blog)
  articles: Article[];

  @Column({ nullable: true })
  userId: string;

  @Column({ default: false })
  isFeatured: boolean;

  @OneToOne(() => User, (user) => user.blog)
  @JoinColumn({ name: 'userId' })
  user: User;
}
