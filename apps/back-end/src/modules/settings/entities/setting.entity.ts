import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Setting as SettingInterface } from '@use-navi-date/shared';

@Entity('settings')
export class Setting implements SettingInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ type: 'enum', enum: ['light', 'dark'] })
  theme: 'light' | 'dark';

  @Column({ default: true })
  allowPush: boolean;

  @Column({ nullable: true })
  notificationPreference?: string;

  @Column({ default: true })
  emailNotification?: boolean;

  @Column('json', { nullable: true })
  privacySettings?: {
    showProfile: boolean;
    showStatus: boolean;
    showLastSeen: boolean;
  };

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user?: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({ default: false })
  isDeleted?: boolean;
} 