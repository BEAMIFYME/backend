import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../security/decorators/public.decorator';
import { Roles } from '../../security/decorators/roles.decorator';
import { Role } from '../../security/permit/roles/roles.enum';

@ApiTags('User Management')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('profile')
  getProfile(@Req() req) {
    return this.usersService.getProfile(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  @Roles(Role.Administrator)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Put('profile')
  updateProfile(@Body() updateProfileDto: UpdateUserDto, @Req() req) {
    return this.usersService.update(req, updateProfileDto);
  }
}
