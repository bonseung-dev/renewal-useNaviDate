import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Couple } from '../../couples/entities/couple.entity';
import { PostImage } from './post-image.entity';
import { PostTag } from './post-tag.entity';
import { Post as PostInterface } from '@use-navi-date/shared';

@Entity('posts')
export class Post implements PostInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column({ type: 'enum', enum: ['private', 'public'] })
  visibility: 'private' | 'public';

  @Column('date')
  date: Date;

  @Column({ type: 'enum', enum: ['Joy', 'Fun', 'Soso', 'Sad', 'Mad'] })
  emotion: 'Joy' | 'Fun' | 'Soso' | 'Sad' | 'Mad';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user?: User;

  @ManyToOne(() => Couple, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'coupleId' })
  couple?: Couple;

  @OneToMany(() => PostImage, image => image.post)
  images?: PostImage[];

  @OneToMany(() => PostTag, tag => tag.post)
  tags?: PostTag[];
} 