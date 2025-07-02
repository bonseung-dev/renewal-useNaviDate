import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Post } from './post.entity';
import { Image } from '../../images/entities/image.entity';

@Entity('post_images')
export class PostImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  postId: string;

  @Column()
  imageId: string;

  @Column({ default: false })
  isRepresentative: boolean;

  @ManyToOne(() => Post, post => post.images)
  @JoinColumn({ name: 'postId' })
  post: Post;

  @ManyToOne(() => Image)
  @JoinColumn({ name: 'imageId' })
  image: Image;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
} 