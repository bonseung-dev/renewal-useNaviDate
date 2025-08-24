import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bookmark, ApiResponse } from '@use-navi-date/shared';
import { Bookmark as BookmarkEntity } from './entities/bookmark.entity';

@Injectable()
export class BookmarksService {
  constructor(
    @InjectRepository(BookmarkEntity)
    private readonly bookmarksRepository: Repository<BookmarkEntity>,
  ) {}

  async create(userId: number, postId: number): Promise<ApiResponse<Bookmark>> {
    try {
      const bookmark = this.bookmarksRepository.create({
        userId,
        postId,
      });
      
      const savedBookmark = await this.bookmarksRepository.save(bookmark);
      
      return {
        success: true,
        data: savedBookmark,
        message: '북마크가 성공적으로 생성되었습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '북마크 생성에 실패했습니다.',
      };
    }
  }

  async findByUserId(userId: number): Promise<ApiResponse<Bookmark[]>> {
    try {
      const bookmarks = await this.bookmarksRepository.find({ where: { userId } });
      return {
        success: true,
        data: bookmarks,
        message: '북마크 목록을 성공적으로 조회했습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '북마크 목록 조회에 실패했습니다.',
      };
    }
  }

  async findAll(): Promise<ApiResponse<Bookmark[]>> {
    try {
      const bookmarks = await this.bookmarksRepository.find({
        relations: ['user', 'post'],
      });
      return {
        success: true,
        data: bookmarks,
        message: '북마크 목록을 성공적으로 조회했습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '북마크 목록 조회에 실패했습니다.',
      };
    }
  }

  async findOne(id: number): Promise<ApiResponse<Bookmark>> {
    try {
      const bookmark = await this.bookmarksRepository.findOne({
        where: { id },
        relations: ['user', 'post'],
      });
      if (!bookmark) {
        return {
          success: false,
          message: '북마크를 찾을 수 없습니다.',
        };
      }
      return {
        success: true,
        data: bookmark,
        message: '북마크를 성공적으로 조회했습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '북마크 조회에 실패했습니다.',
      };
    }
  }

  async remove(id: number): Promise<ApiResponse<void>> {
    try {
      const bookmark = await this.bookmarksRepository.findOne({ where: { id } });
      if (!bookmark) {
        return {
          success: false,
          message: '북마크를 찾을 수 없습니다.',
        };
      }

      await this.bookmarksRepository.remove(bookmark);
      
      return {
        success: true,
        message: '북마크가 성공적으로 삭제되었습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '북마크 삭제에 실패했습니다.',
      };
    }
  }
} 