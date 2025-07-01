import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Post as SharedPost } from '@use-navi-date/shared';
import { User } from '../../users/entities/user.entity';
import { Couple } from '../../couples/entities/couple.entity';

@Entity('posts')
export class Post implements SharedPost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column({ nullable: true })
  coupleId?: string;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column('date')
  date: Date;

  @Column({ nullable: true })
  location?: string;

  @Column({ type: 'enum', enum: ['happy', 'sad', 'excited', 'angry', 'usual'] })
  emotion: 'happy' | 'sad' | 'excited' | 'angry' | 'usual';

  @Column('simple-array', { nullable: true })
  images?: string[];

  @Column('simple-array', { nullable: true })
  tags?: string[];

  @Column({ type: 'enum', enum: ['private', 'public'] })
  visibility: 'private' | 'public';

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date | null;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @ManyToOne(() => Couple, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'coupleId' })
  couple: Couple;
} 