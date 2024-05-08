import { Injectable, Req } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { getManager, Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog) private blogRepository: Repository<Blog>,
    @InjectRepository(Article) private articleRepository: Repository<Article>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAllBlogs(): Promise<Blog[]> {
    return this.blogRepository.find();
  }

  async findBlogById(id: string): Promise<Blog> {
    return this.blogRepository.findOne({
      where: { id },
    });
  }

  async findAllArticles(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  async findArticleById(id: string): Promise<Article> {
    return this.articleRepository.findOne({
      where: { id },
    });
  }

  async createBlog(createBlogDto: CreateBlogDto, @Req() req): Promise<Blog> {
    // Fetch the user from the database using the email
    const user = await this.userRepository.findOne({
      where: { email: req.user.email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Check if the user already has a blog
    if (user.blog) {
      throw new Error('User is already a blogger');
    }

    // Create a new blog
    const blog = this.blogRepository.create(createBlogDto);

    // Attach the blog to the user
    blog.user = user;
    blog.userId = user.id; // Manually set the userId field

    // Set the isBlogger property of the blog to true
    blog.isBlogger = true;

    // Save the blog
    return await this.blogRepository.save(blog);
  }

  async createArticle(
    userId: string,
    createArticleDto: CreateArticleDto,
  ): Promise<Article> {
    // Fetch the user from the database using the userId
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['blog'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Check if the user has a blog
    if (!user.blog) {
      throw new Error('User does not have a blog');
    }

    const article = this.articleRepository.create(createArticleDto);
    article.blog = user.blog;
    article.authorId = userId;
    return this.articleRepository.save(article);
  }

  async updateBlog(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    const blog = await this.blogRepository.findOne({
      where: { id },
    });
    if (!blog) {
      throw new Error('Blog not found');
    }
    this.blogRepository.merge(blog, updateBlogDto);
    return this.blogRepository.save(blog);
  }

  async deleteBlog(id: string): Promise<void> {
    const blog = await this.blogRepository.findOne({
      where: { id },
    });
    if (!blog) {
      throw new Error('Blog not found');
    }
    await this.blogRepository.remove(blog);
  }

  async updateArticle(id: string, article: Article): Promise<Article> {
    const existingArticle = await this.articleRepository.findOne({
      where: { id },
    });
    if (!existingArticle) {
      throw new Error('Article not found');
    }
    this.articleRepository.merge(existingArticle, article);
    return this.articleRepository.save(existingArticle);
  }

  async deleteArticle(id: string): Promise<void> {
    const article = await this.articleRepository.findOne({
      where: { id },
    });
    if (!article) {
      throw new Error('Article not found');
    }
    await this.articleRepository.remove(article);
  }
}
