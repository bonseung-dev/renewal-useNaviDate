import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User as UserInterface } from '@use-navi-date/shared';

@Entity('users')
export class User implements UserInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  nickname: string;

  @Column({ nullable: true })
  profileImage?: string;

  @Column({ nullable: true })
  googleId?: string;

  @Column({ default: false })
  isVerified?: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({ default: false })
  isDeleted?: boolean;

  tempToken?: string;
} 