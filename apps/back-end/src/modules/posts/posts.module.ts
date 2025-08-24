import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from './entities/post.entity';
import { PostImage } from './entities/post-image.entity';
import { PostImageService } from './post-image.service';
import { PostImageController } from './post-image.controller';
import { Image } from '../images/entities/image.entity';
import { TagsModule } from '../tags/tags.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, PostImage, Image]),
    TagsModule,
  ],
  controllers: [PostsController, PostImageController],
  providers: [PostsService, PostImageService],
  exports: [PostsService, PostImageService],
})
export class PostsModule {} 