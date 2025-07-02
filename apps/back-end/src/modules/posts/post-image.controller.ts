import { Controller, Post, Delete, Get, Param, Body, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostImageService } from './post-image.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('post-images')
@UseGuards(JwtAuthGuard)
export class PostImageController {
  constructor(private readonly postImageService: PostImageService) {}

  @Post(':postId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('postId') postId: string,
  ) {
    return this.postImageService.uploadFile(file, postId);
  }

  @Delete(':id')
  async deleteFile(@Param('id') id: string) {
    await this.postImageService.deleteFile(id);
    return { message: 'File deleted successfully' };
  }

  @Get('post/:postId')
  async getFilesByPostId(@Param('postId') postId: string) {
    return this.postImageService.getFilesByPostId(postId);
  }

  @Post(':id/order')
  async updateOrder(
    @Param('id') id: string,
    @Body('order') order: number,
  ) {
    return this.postImageService.updateOrder(id, order);
  }
} 