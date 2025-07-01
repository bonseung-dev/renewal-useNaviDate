import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Like as SharedLike } from '@use-navi-date/shared';
import { User } from '../../users/entities/user.entity';
import { Post } from '../../posts/entities/post.entity';

@Entity('likes')
export class Like implements SharedLike {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  postId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user?: User;

  @ManyToOne(() => Post, { nullable: true })
  @JoinColumn({ name: 'postId' })
  post?: Post;
} 