import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Image as SharedImage } from '@use-navi-date/shared';
import { User } from '../../users/entities/user.entity';

@Entity('images')
export class Image implements SharedImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  filename: string;

  @Column()
  originalName: string;

  @Column()
  mimeType: string;

  @Column()
  size: number;

  @Column()
  path: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  userId?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user?: User;
} 