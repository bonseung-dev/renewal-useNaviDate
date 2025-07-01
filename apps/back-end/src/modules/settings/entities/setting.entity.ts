import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Setting as SharedSetting } from '@use-navi-date/shared';
import { User } from '../../users/entities/user.entity';

@Entity('settings')
export class Setting implements SharedSetting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column({ nullable: true })
  notificationPreference?: string;

  @Column({ nullable: true })
  themePreference?: string;

  @Column({ default: true })
  emailNotification?: boolean;

  @Column({ default: true })
  pushNotification?: boolean;

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
  updatedAt: Date;
} 