import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { User as SharedUser } from '@use-navi-date/shared';
import { Image } from '../../images/entities/image.entity';

@Entity('users')
export class User implements SharedUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  profileImage?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Image, { nullable: true })
  @JoinColumn()
  profileImageEntity?: Image;
} 