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
    postImage.post_id = postId;
    postImage.original_name = file.originalname;
    postImage.file_name = fileName;
    postImage.file_path = filePath;
    postImage.file_type = file.mimetype;
    postImage.file_size = file.size;
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

    // 파일 삭제
    if (fs.existsSync(image.file_path)) {
      fs.unlinkSync(image.file_path);
    }

    // DB에서 삭제
    await this.postImageRepository.softDelete(id);
  }

  async getFilesByPostId(postId: string): Promise<PostImage[]> {
    return this.postImageRepository.find({
      where: { post_id: postId },
      order: { order: 'ASC' },
    });
  }

  async updateOrder(id: string, order: number): Promise<PostImage | null> {
    await this.postImageRepository.update(id, { order });
    return this.postImageRepository.findOne({ where: { id } });
  }
} 