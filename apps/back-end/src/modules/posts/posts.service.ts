import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post, CreatePostDto, ApiResponse } from '@use-navi-date/shared';
import { Post as PostEntity } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<ApiResponse<Post>> {
    try {
      const post = this.postsRepository.create({
        user_id: createPostDto.coupleId || '', // 임시로 빈 문자열 설정
        coupleId: createPostDto.coupleId,
        title: createPostDto.title,
        content: createPostDto.content,
        date: createPostDto.date,
        location: createPostDto.location,
        emotion: createPostDto.emotion,
        images: createPostDto.images,
        tags: createPostDto.tags,
        visibility: createPostDto.isPublic ? 'public' : 'private',
      });
      
      const savedPost = await this.postsRepository.save(post);
      
      return {
        success: true,
        data: savedPost,
        message: '게시글이 성공적으로 생성되었습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '게시글 생성에 실패했습니다.',
      };
    }
  }

  async findAll(): Promise<ApiResponse<Post[]>> {
    try {
      const posts = await this.postsRepository.find({
        relations: ['user'],
      });
      return {
        success: true,
        data: posts,
        message: '게시글 목록을 성공적으로 조회했습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '게시글 목록 조회에 실패했습니다.',
      };
    }
  }

  async findOne(id: string): Promise<ApiResponse<Post>> {
    try {
      const post = await this.postsRepository.findOne({
        where: { id },
        relations: ['user'],
      });
      if (!post) {
        return {
          success: false,
          message: '게시글을 찾을 수 없습니다.',
        };
      }
      return {
        success: true,
        data: post,
        message: '게시글을 성공적으로 조회했습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '게시글 조회에 실패했습니다.',
      };
    }
  }

  async update(id: string, updatePostDto: Partial<CreatePostDto>): Promise<ApiResponse<Post>> {
    try {
      const post = await this.postsRepository.findOne({ where: { id } });
      if (!post) {
        return {
          success: false,
          message: '게시글을 찾을 수 없습니다.',
        };
      }

      Object.assign(post, updatePostDto);
      const updatedPost = await this.postsRepository.save(post);
      
      return {
        success: true,
        data: updatedPost,
        message: '게시글이 성공적으로 업데이트되었습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '게시글 업데이트에 실패했습니다.',
      };
    }
  }

  async remove(id: string): Promise<ApiResponse<void>> {
    try {
      const post = await this.postsRepository.findOne({ where: { id } });
      if (!post) {
        return {
          success: false,
          message: '게시글을 찾을 수 없습니다.',
        };
      }

      await this.postsRepository.remove(post);
      
      return {
        success: true,
        message: '게시글이 성공적으로 삭제되었습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '게시글 삭제에 실패했습니다.',
      };
    }
  }
} 