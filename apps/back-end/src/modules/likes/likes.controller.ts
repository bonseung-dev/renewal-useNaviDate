import { Controller, Get, Post, Param, Delete, Request, ParseIntPipe } from '@nestjs/common';
import { LikesService } from './likes.service';
import { ApiResponse, Like } from '@use-navi-date/shared';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post(':postId')
  create(@Param('postId', ParseIntPipe) postId: number, @Request() req): Promise<ApiResponse<Like>> {
    const userId = req.user?.id;
    return this.likesService.create(userId, postId);
  }

  @Get()
  findAll(): Promise<ApiResponse<Like[]>> {
    return this.likesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<Like>> {
    return this.likesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<void>> {
    return this.likesService.remove(id);
  }
} 