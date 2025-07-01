import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Post } from './post.entity';

@Entity('posttags')
export class PostTag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Post, post => post.tags)
  post: Post;

  @Column()
  post_id: string;

  @Column({ length: 8 })
  name: string;
} 