import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto, CreateTagsDto, UpdateTagDto, ApiResponse, Tag } from './dto/create-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  async create(@Body() createTagDto: CreateTagDto): Promise<ApiResponse<{ tag: Tag }>> {
    try {
      const tag = await this.tagsService.create(createTagDto);
      return {
        success: true,
        data: { tag },
        message: '태그가 성공적으로 생성되었습니다.'
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException({
        success: false,
        message: '태그 생성 중 오류가 발생했습니다.',
        error: error.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('multiple')
  async createMultiple(@Body() createTagsDto: CreateTagsDto): Promise<ApiResponse<Tag[]>> {
    try {
      const tags = await this.tagsService.createMultiple(createTagsDto);
      return {
        success: true,
        data: tags,
        message: '태그들이 성공적으로 생성되었습니다.'
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException({
        success: false,
        message: '태그 생성 중 오류가 발생했습니다.',
        error: error.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll(): Promise<ApiResponse<{ tags: Tag[] }>> {
    try {
      const tags = await this.tagsService.findAll();
      return {
        success: true,
        data: { tags },
        message: '태그 목록을 성공적으로 조회했습니다.'
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException({
        success: false,
        message: '태그 목록 조회 중 오류가 발생했습니다.',
        error: error.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('popular')
  async getPopularTags(@Query('limit') limit?: string): Promise<ApiResponse<Tag[]>> {
    try {
      const limitNum = limit ? parseInt(limit, 10) : 10;
      const tags = await this.tagsService.getPopularTags(limitNum);
      return {
        success: true,
        data: tags,
        message: '인기 태그를 성공적으로 조회했습니다.'
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException({
        success: false,
        message: '인기 태그 조회 중 오류가 발생했습니다.',
        error: error.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<Tag>> {
    try {
      const tag = await this.tagsService.findById(id);
      return {
        success: true,
        data: tag,
        message: '태그를 성공적으로 조회했습니다.'
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException({
        success: false,
        message: '태그 조회 중 오류가 발생했습니다.',
        error: error.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTagDto: UpdateTagDto,
  ): Promise<ApiResponse<Tag>> {
    try {
      const tag = await this.tagsService.update(id, updateTagDto);
      return {
        success: true,
        data: tag,
        message: '태그가 성공적으로 수정되었습니다.'
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException({
        success: false,
        message: '태그 수정 중 오류가 발생했습니다.',
        error: error.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<{ message: string }>> {
    try {
      await this.tagsService.remove(id);
      return {
        success: true,
        data: { message: '태그가 삭제되었습니다.' },
        message: '태그가 성공적으로 삭제되었습니다.'
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException({
        success: false,
        message: '태그 삭제 중 오류가 발생했습니다.',
        error: error.message
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
