import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ChatMessage as SharedChatMessage } from '@use-navi-date/shared';
import { Chat } from './chat.entity';
import { User } from '../../users/entities/user.entity';

@Entity('chat_messages')
export class ChatMessage implements SharedChatMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  chatId: string;

  @Column()
  userId: string;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Chat, { nullable: true })
  @JoinColumn({ name: 'chatId' })
  chat?: Chat;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user?: User;
} 