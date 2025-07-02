import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostImage } from './entities/post-image.entity';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PostImageService {
  constructor(
    @InjectRepository(PostImage)
    private postImageRepository: Repository<PostImage>,
  ) {}

  async uploadFile(file: Express.Multer.File, postId: string, address?: string): Promise<PostImage> {
    const uploadDir = path.join(process.cwd(), 'uploads', 'posts');
    
    // 디렉토리가 없으면 생성
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // 파일명 생성 (UUID + 원본 확장자)
    const fileExt = path.extname(file.originalname);
    const fileName = `${uuidv4()}${fileExt}`;
    const filePath = path.join(uploadDir, fileName);

    // 파일 저장
    fs.writeFileSync(filePath, file.buffer);

    // DB에 저장
    const postImage = new PostImage();
    postImage.postId = postId;
    postImage.imageUrl = `/uploads/posts/${fileName}`;
    if (address) {
      postImage.address = address;
    }

    return this.postImageRepository.save(postImage);
  }

  async deleteFile(id: string): Promise<void> {
    const image = await this.postImageRepository.findOne({ where: { id } });
    if (!image) {
      return;
    }

    // 파일 삭제 (imageUrl에서 파일 경로 추출)
    const filePath = path.join(process.cwd(), 'uploads', 'posts', path.basename(image.imageUrl));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // DB에서 삭제
    await this.postImageRepository.softDelete(id);
  }

  async getFilesByPostId(postId: string): Promise<PostImage[]> {
    return this.postImageRepository.find({
      where: { postId },
      order: { createdAt: 'ASC' },
    });
  }

  async updateOrder(id: string, order: number): Promise<PostImage | null> {
    // order 필드가 없으므로 createdAt으로 정렬
    return this.postImageRepository.findOne({ where: { id } });
  }

  async create(postImageData: Partial<PostImage>): Promise<PostImage> {
    const postImage = this.postImageRepository.create(postImageData);
    return await this.postImageRepository.save(postImage);
  }

  async findAll(): Promise<PostImage[]> {
    return await this.postImageRepository.find();
  }

  async findOne(id: string): Promise<PostImage | null> {
    return await this.postImageRepository.findOne({ where: { id } });
  }

  async findByPostId(postId: string): Promise<PostImage[]> {
    return await this.postImageRepository.find({ where: { postId } });
  }

  async update(id: string, updateData: Partial<PostImage>): Promise<PostImage | null> {
    await this.postImageRepository.update(id, updateData);
    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.postImageRepository.delete(id);
  }

  async removeByPostId(postId: string): Promise<void> {
    await this.postImageRepository.delete({ postId });
  }
} 