import { Controller, Get, Post, Body, Patch, Param, Delete, Request, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, ApiResponse, User } from '@use-navi-date/shared';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<ApiResponse<User>> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<ApiResponse<User[]>> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<User>> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: Partial<CreateUserDto>): Promise<ApiResponse<User>> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<void>> {
    return this.usersService.remove(id);
  }

  @Get('profile/me')
  getProfile(@Request() req): Promise<ApiResponse<User>> {
    const userId = req.user?.id;
    if (!userId) {
      return Promise.resolve({
        success: false,
        message: '인증되지 않은 사용자입니다.',
      });
    }
    return this.usersService.findOne(userId);
  }

  @Patch('profile/me')
  updateProfile(@Request() req, @Body() updateData: Partial<CreateUserDto>): Promise<ApiResponse<User>> {
    const userId = req.user?.id;
    if (!userId) {
      return Promise.resolve({
        success: false,
        message: '인증되지 않은 사용자입니다.',
      });
    }
    return this.usersService.updateProfile(userId, updateData);
  }
} 