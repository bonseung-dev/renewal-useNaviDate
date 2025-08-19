import { Controller, Get, Post, Param, Delete, Request, ParseIntPipe, Req } from '@nestjs/common';
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

  @Get()
  findAll(@Request() req): Promise<ApiResponse<Bookmark[]>> {
    const userId = req.user?.id;
    return this.bookmarksService.findAll(userId);
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