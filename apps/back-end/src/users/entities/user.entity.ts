import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  profile_image?: string;

  @Column({ default: false })
  is_verified: boolean;

  @Column({ nullable: true })
  google_id?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
} 