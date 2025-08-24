import { Controller, Get, Post, Param, Delete, Request, ParseIntPipe } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { ApiResponse, Bookmark } from '@use-navi-date/shared';

@Controller('bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Post(':postId')
  create(@Param('postId', ParseIntPipe) postId: number, @Request() req): Promise<ApiResponse<Bookmark>> {
    const userId = req.user?.id;
    return this.bookmarksService.create(userId, postId);
  }

  @Get('/:userId')
  findByUserId(@Param('userId', ParseIntPipe) userId: number): Promise<ApiResponse<Bookmark[]>> {
    return this.bookmarksService.findByUserId(userId);
  }

  @Get()
  findAll(): Promise<ApiResponse<Bookmark[]>> {
    return this.bookmarksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<Bookmark>> {
    return this.bookmarksService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<void>> {
    return this.bookmarksService.remove(id);
  }
} 