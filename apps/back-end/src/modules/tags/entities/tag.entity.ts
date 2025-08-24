import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Post } from '../../posts/entities/post.entity';
import { Tag as TagInterface } from '@use-navi-date/shared';

@Entity('tags')
export class Tag implements TagInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({ default: false })
  isDeleted?: boolean;

  @ManyToMany(() => Post, post => post.tags)
  @JoinTable({
    name: 'post_tags',
    joinColumn: {
      name: 'tagId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'postId',
      referencedColumnName: 'id',
    },
  })
  posts?: Post[];
}
