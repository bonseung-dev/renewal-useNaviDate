import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Post } from './post.entity';
import { Image } from '../../images/entities/image.entity';
import { PostImage as PostImageInterface } from '@use-navi-date/shared';

@Entity('post_images')
export class PostImage implements PostImageInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  postId: number;

  @Column()
  imageId: number;

  @Column({ default: false })
  isRepresentative: boolean;

  @Column({ type: 'text', nullable: true })
  address: string | null;

  @Column({ type: 'text', nullable: true })
  imageUrl: string;

  @ManyToOne(() => Post, post => post.images)
  @JoinColumn({ name: 'postId' })
  post: Post;

  @ManyToOne(() => Image)
  @JoinColumn({ name: 'imageId' })
  image: Image;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({ default: false })
  isDeleted?: boolean;

  @DeleteDateColumn()
  deletedAt: Date;
} 