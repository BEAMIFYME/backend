import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  blogName: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  blogDescription: string;

  userId: string;
}
