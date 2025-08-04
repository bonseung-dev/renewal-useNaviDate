import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Post } from './post.entity';
import { PostTag as PostTagInterface } from '@use-navi-date/shared';

@Entity('post_tags')
export class PostTag implements PostTagInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  postId: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({ default: false })
  isDeleted?: boolean;

  @ManyToOne(() => Post, post => post.tags)
  @JoinColumn({ name: 'postId' })
  post: Post;
} 