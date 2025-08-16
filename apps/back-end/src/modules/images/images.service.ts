import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image, ApiResponse } from '@use-navi-date/shared';
import { Image as ImageEntity } from './entities/image.entity';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(ImageEntity)
    private readonly imagesRepository: Repository<ImageEntity>,
  ) {}

  async create(imageData: Partial<ImageEntity>): Promise<ApiResponse<Image>> {
    try {
      const image = this.imagesRepository.create(imageData);
      const savedImage = await this.imagesRepository.save(image);
      
      return {
        success: true,
        data: savedImage,
        message: '이미지가 성공적으로 업로드되었습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '이미지 업로드에 실패했습니다.',
      };
    }
  }

  async uploadImage(file: Express.Multer.File, userId?: number): Promise<ApiResponse<Image>> {
    try {
      if (!file) {
        return {
          success: false,
          message: '업로드할 파일이 없습니다.',
        };
      }

      // 파일 타입 검증
      const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedMimeTypes.includes(file.mimetype)) {
        return {
          success: false,
          message: '지원하지 않는 파일 형식입니다. JPEG, PNG, GIF, WebP만 허용됩니다.',
        };
      }

      // 파일 크기 검증 (50MB)
      if (file.size > 50 * 1024 * 1024) {
        return {
          success: false,
          message: '파일 크기가 너무 큽니다. 최대 50MB까지 허용됩니다.',
        };
      }

      // 고유한 파일명 생성
      const fileExtension = path.extname(file.originalname);
      const filename = `${uuidv4()}${fileExtension}`;
      
      // 업로드 디렉토리 생성
      const uploadDir = path.join(process.cwd(), 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // 파일 저장
      const filePath = path.join(uploadDir, filename);
      fs.writeFileSync(filePath, file.buffer);

      // 데이터베이스에 이미지 정보 저장
      const imageData = {
        filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        path: `/uploads/${filename}`,
        url: `/uploads/${filename}`,
        userId: userId || undefined, // userId가 없으면 undefined로 설정
      };

      return await this.create(imageData);
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '이미지 업로드에 실패했습니다.',
      };
    }
  }

  async findAll(): Promise<ApiResponse<Image[]>> {
    try {
      const images = await this.imagesRepository.find({
        relations: ['user'],
      });
      return {
        success: true,
        data: images,
        message: '이미지 목록을 성공적으로 조회했습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '이미지 목록 조회에 실패했습니다.',
      };
    }
  }

  async findOne(id: number): Promise<ApiResponse<Image>> {
    try {
      const image = await this.imagesRepository.findOne({
        where: { id },
        relations: ['user'],
      });
      if (!image) {
        return {
          success: false,
          message: '이미지를 찾을 수 없습니다.',
        };
      }
      return {
        success: true,
        data: image,
        message: '이미지를 성공적으로 조회했습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '이미지 조회에 실패했습니다.',
      };
    }
  }

  async remove(id: number): Promise<ApiResponse<void>> {
    try {
      const image = await this.imagesRepository.findOne({ where: { id } });
      if (!image) {
        return {
          success: false,
          message: '이미지를 찾을 수 없습니다.',
        };
      }

      // 파일 시스템에서 이미지 파일 삭제
      const filePath = path.join(process.cwd(), image.path);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      await this.imagesRepository.remove(image);
      
      return {
        success: true,
        message: '이미지가 성공적으로 삭제되었습니다.',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: '이미지 삭제에 실패했습니다.',
      };
    }
  }
} 