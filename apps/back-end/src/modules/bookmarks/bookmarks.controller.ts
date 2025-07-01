import { Controller, Get, Post, Param, Delete, Request } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { ApiResponse, Bookmark } from '@use-navi-date/shared';

@Controller('bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Post(':postId')
  create(@Param('postId') postId: string, @Request() req): Promise<ApiResponse<Bookmark>> {
    const userId = req.user?.id;
    return this.bookmarksService.create(userId, postId);
  }

  @Get()
  findAll(): Promise<ApiResponse<Bookmark[]>> {
    return this.bookmarksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ApiResponse<Bookmark>> {
    return this.bookmarksService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<ApiResponse<void>> {
    return this.bookmarksService.remove(id);
  }
} 