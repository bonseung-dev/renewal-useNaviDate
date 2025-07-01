import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from './entities/post.entity';
import { PostTag } from './entities/post-tag.entity';
import { PostImage } from './entities/post-image.entity';
import { PostImageService } from './post-image.service';
import { PostImageController } from './post-image.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, PostTag, PostImage]),
  ],
  controllers: [PostsController, PostImageController],
  providers: [PostsService, PostImageService],
  exports: [PostsService, PostImageService],
})
export class PostsModule {} 