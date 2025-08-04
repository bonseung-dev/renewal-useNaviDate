import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like, ApiResponse } from '@use-navi-date/shared';
import { Like as LikeEntity } from './entities/like.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(LikeEntity)
    private likesRepository: Repository<LikeEntity>,
  ) {}

  async create(userId: number, postId: number): Promise<ApiResponse<Like>> {
    try {
      const like = this.likesRepository.create({
        userId,
        postId,
      });
      
      const savedLike = await this.likesRepository.save(like);
      
      return {
        success: true,
        data: savedLike,
        message: '좋아요가 성공적으로 생성되었습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '좋아요 생성에 실패했습니다.',
      };
    }
  }

  async findAll(): Promise<ApiResponse<Like[]>> {
    try {
      const likes = await this.likesRepository.find({
        relations: ['user', 'post'],
      });
      return {
        success: true,
        data: likes,
        message: '좋아요 목록을 성공적으로 조회했습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '좋아요 목록 조회에 실패했습니다.',
      };
    }
  }

  async findOne(id: number): Promise<ApiResponse<Like>> {
    try {
      const like = await this.likesRepository.findOne({
        where: { id },
        relations: ['user', 'post'],
      });
      if (!like) {
        return {
          success: false,
          message: '좋아요를 찾을 수 없습니다.',
        };
      }
      return {
        success: true,
        data: like,
        message: '좋아요를 성공적으로 조회했습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '좋아요 조회에 실패했습니다.',
      };
    }
  }

  async remove(id: number): Promise<ApiResponse<void>> {
    try {
      const like = await this.likesRepository.findOne({ where: { id } });
      if (!like) {
        return {
          success: false,
          message: '좋아요를 찾을 수 없습니다.',
        };
      }

      await this.likesRepository.remove(like);
      
      return {
        success: true,
        message: '좋아요가 성공적으로 삭제되었습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '좋아요 삭제에 실패했습니다.',
      };
    }
  }
} 