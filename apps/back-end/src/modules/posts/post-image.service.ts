import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostImage } from './entities/post-image.entity';
import { Image } from '../images/entities/image.entity';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PostImageService {
  constructor(
    @InjectRepository(PostImage)
    private postImageRepository: Repository<PostImage>,
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  async uploadFile(file: Express.Multer.File, postId: number): Promise<PostImage> {
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

    // Image 엔티티 생성 및 저장
    const image = new Image();
    image.filename = fileName;
    image.originalName = file.originalname;
    image.mimeType = file.mimetype;
    image.size = file.size;
    image.path = filePath;
    image.url = `/uploads/posts/${fileName}`;
    
    const savedImage = await this.imageRepository.save(image);

    // PostImage 엔티티 생성 및 저장
    const postImage = new PostImage();
    postImage.postId = postId;
    postImage.imageId = savedImage.id;

    return this.postImageRepository.save(postImage);
  }

  async deleteFile(id: number): Promise<void> {
    const postImage = await this.postImageRepository.findOne({ 
      where: { id },
      relations: ['image']
    });
    
    if (!postImage) {
      return;
    }

    // 파일 삭제
    if (fs.existsSync(postImage.image.path)) {
      fs.unlinkSync(postImage.image.path);
    }

    // Image 엔티티 삭제
    await this.imageRepository.delete(postImage.imageId);

    // PostImage 엔티티 삭제
    await this.postImageRepository.softDelete(id);
  }

  async getFilesByPostId(postId: number): Promise<PostImage[]> {
    return this.postImageRepository.find({
      where: { postId },
      relations: ['image'],
      order: { createdAt: 'ASC' },
    });
  }

  async updateOrder(id: number, order: number): Promise<PostImage | null> {
    // order 필드가 없으므로 createdAt으로 정렬
    return this.postImageRepository.findOne({ 
      where: { id },
      relations: ['image']
    });
  }

  async create(postImageData: Partial<PostImage>): Promise<PostImage> {
    const postImage = this.postImageRepository.create(postImageData);
    return await this.postImageRepository.save(postImage);
  }

  async findAll(): Promise<PostImage[]> {
    return await this.postImageRepository.find({
      relations: ['image']
    });
  }

  async findOne(id: number): Promise<PostImage | null> {
    return await this.postImageRepository.findOne({ 
      where: { id },
      relations: ['image']
    });
  }

  async findByPostId(postId: number): Promise<PostImage[]> {
    return await this.postImageRepository.find({
      where: { postId },
      relations: ['image']
    });
  }

  async update(id: number, updateData: Partial<PostImage>): Promise<PostImage | null> {
    await this.postImageRepository.update(id, updateData);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.postImageRepository.delete(id);
  }

  async removeByPostId(postId: number): Promise<void> {
    await this.postImageRepository.delete({ postId });
  }
} 