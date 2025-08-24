import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto, CreateTagsDto, UpdateTagDto } from './dto/create-tag.dto';
import { Tag } from './entities/tag.entity';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  async create(@Body() createTagDto: CreateTagDto): Promise<Tag> {
    return await this.tagsService.create(createTagDto);
  }

  @Post('multiple')
  async createMultiple(@Body() createTagsDto: CreateTagsDto): Promise<Tag[]> {
    return await this.tagsService.createMultiple(createTagsDto);
  }

  @Get()
  async findAll(): Promise<Tag[]> {
    return await this.tagsService.findAll();
  }

  @Get('popular')
  async getPopularTags(@Query('limit') limit?: string): Promise<Tag[]> {
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return await this.tagsService.getPopularTags(limitNum);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Tag> {
    return await this.tagsService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTagDto: UpdateTagDto,
  ): Promise<Tag> {
    return await this.tagsService.update(id, updateTagDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.tagsService.remove(id);
    return { message: '태그가 삭제되었습니다.' };
  }
}
