import { Controller, Get, Post, Body, Patch, Param, Delete, Request, ParseIntPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, ApiResponse, Post as SharedPost } from '@use-navi-date/shared';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto): Promise<ApiResponse<SharedPost>> {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll(): Promise<ApiResponse<SharedPost[]>> {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<SharedPost>> {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePostDto: Partial<CreatePostDto>): Promise<ApiResponse<SharedPost>> {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<void>> {
    return this.postsService.remove(id);
  }
}