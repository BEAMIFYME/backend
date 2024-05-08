import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../database/base/base.entity';
import { Blog } from './blog.entity';

@Entity()
export class Article extends BaseEntity {
  @Column({ nullable: true })
  title: string;
  @Column({ nullable: true })
  content: string;
  @Column({ nullable: true })
  authorId: string;
  @Column({ nullable: true })
  isPublished: boolean;

  @Column({ nullable: true, default: false })
  isFeatured: boolean;

  @ManyToOne(() => Blog, (blog) => blog.articles)
  blog: Blog;
}
