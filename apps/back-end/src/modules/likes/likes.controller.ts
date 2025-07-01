import { Controller, Get, Post, Param, Delete, Request } from '@nestjs/common';
import { LikesService } from './likes.service';
import { ApiResponse, Like } from '@use-navi-date/shared';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post(':postId')
  create(@Param('postId') postId: string, @Request() req): Promise<ApiResponse<Like>> {
    const userId = req.user?.id;
    return this.likesService.create(userId, postId);
  }

  @Get()
  findAll(): Promise<ApiResponse<Like[]>> {
    return this.likesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ApiResponse<Like>> {
    return this.likesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<ApiResponse<void>> {
    return this.likesService.remove(id);
  }
} 