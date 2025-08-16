import { Controller, Post, Get, Delete, Param, UseInterceptors, UploadedFile, UseGuards, Req, ParseIntPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiResponse, Image } from '@use-navi-date/shared';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('upload')
  // @UseGuards(JwtAuthGuard) // 인증 가드 제거
  @UseInterceptors(FileInterceptor('file', {
    storage: require('multer').memoryStorage(),
    limits: {
      fileSize: 50 * 1024 * 1024, // 50MB
    },
    fileFilter: (req, file, cb) => {
      // 파일 타입 검증
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('이미지 파일만 업로드 가능합니다.'), false);
      }
    },
  }))
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Req() req): Promise<ApiResponse<Image>> {
    if (!file) {
      return {
        success: false,
        message: '업로드할 파일이 없습니다.',
      };
    }
    
    const userId = req.user?.id; // 인증된 사용자가 있으면 사용, 없으면 undefined
    return this.imagesService.uploadImage(file, userId);
  }

  @Get()
  findAll(): Promise<ApiResponse<Image[]>> {
    return this.imagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<Image>> {
    return this.imagesService.findOne(id);
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard) // 인증 가드 제거
  remove(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<void>> {
    return this.imagesService.remove(id);
  }

} 