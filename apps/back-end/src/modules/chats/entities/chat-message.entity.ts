import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Chat } from './chat.entity';
import { User } from '../../users/entities/user.entity';
import { ChatMessage as ChatMessageInterface } from '@use-navi-date/shared';

@Entity('chat_messages')
export class ChatMessage implements ChatMessageInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chatId: number;

  @Column()
  userId: number;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({ default: false })
  isDeleted?: boolean;

  @ManyToOne(() => Chat, { nullable: true })
  @JoinColumn({ name: 'chatId' })
  chat?: Chat;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user?: User;
} 