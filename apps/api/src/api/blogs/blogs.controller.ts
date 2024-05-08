import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Article } from './entities/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { Roles } from '../../security/decorators/roles.decorator';
import { Role } from '../../security/permit/roles/roles.enum';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Blog Management')
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Get('all')
  async findAllBlogs() {
    return this.blogsService.findAllBlogs();
  }

  @Get(':id')
  async findBlogById(@Param('id') id: string) {
    return this.blogsService.findBlogById(id);
  }

  @Post()
  async createBlog(@Body() createBlogDto: CreateBlogDto, @Req() req) {
    return this.blogsService.createBlog(createBlogDto, req);
  }

  @Post('articles')
  async createArticle(@Body() createArticleDto: CreateArticleDto, @Req() req) {
    if (!req.user || !req.user.sub) {
      throw new Error('User is not authenticated');
    }
    createArticleDto.isPublished = true;
    return this.blogsService.createArticle(req.user.sub, createArticleDto);
  }

  @Patch(':id')
  async updateBlog(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
  ) {
    return this.blogsService.updateBlog(id, updateBlogDto);
  }

  @Delete(':id')
  // @Roles(Role.Administrator)
  @ApiOperation({ summary: 'Delete an blog | Currently Admin Only' })
  async deleteBlog(@Param('id') id: string) {
    return this.blogsService.deleteBlog(id);
  }

  @Patch(':blogId/articles/:id')
  async updateArticle(@Param('id') id: string, @Body() article: Article) {
    return this.blogsService.updateArticle(id, article);
  }

  @Delete(':blogId/articles/:id')
  // @Roles(Role.Administrator)
  @ApiBody({ type: Article })
  @ApiResponse({ status: 200, description: 'Article deleted' })
  @ApiOperation({ summary: 'Delete an article | Currently Admin Only' })
  async deleteArticle(@Param('id') id: string) {
    return this.blogsService.deleteArticle(id);
  }

  @Get('articles/all')
  async findAllArticles() {
    return this.blogsService.findAllArticles();
  }

  @Get('articles/:id')
  async findArticleById(@Param('id') id: string) {
    return this.blogsService.findArticleById(id);
  }
}
