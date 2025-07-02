import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity('post_tags')
export class PostTag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  postId: string;

  @Column()
  name: string;

  @ManyToOne(() => Post, post => post.tags)
  @JoinColumn({ name: 'postId' })
  post: Post;
} 