import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity('post_images')
export class PostImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  post_id: string;

  @Column()
  original_name: string;

  @Column()
  file_name: string;

  @Column()
  file_path: string;

  @Column()
  file_type: string;

  @Column()
  file_size: number;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  order: number;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => Post, post => post.images)
  post: Post;
} 