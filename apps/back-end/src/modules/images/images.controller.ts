import { Controller, Post, Get, Delete, Param, UseInterceptors, UploadedFile, UseGuards, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiResponse, Image } from '@use-navi-date/shared';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Req() req): Promise<ApiResponse<Image>> {
    const userId = req.user?.id;
    return this.imagesService.uploadImage(file, userId);
  }

  @Get()
  findAll(): Promise<ApiResponse<Image[]>> {
    return this.imagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ApiResponse<Image>> {
    return this.imagesService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string): Promise<ApiResponse<void>> {
    return this.imagesService.remove(id);
  }

} 