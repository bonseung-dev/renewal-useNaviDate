import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Chat as SharedChat } from '@use-navi-date/shared';
import { User } from '../../users/entities/user.entity';
import { ChatMessage } from './chat-message.entity';

@Entity('chats')
export class Chat implements SharedChat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user1Id: string;

  @Column()
  user2Id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user1Id' })
  user1?: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user2Id' })
  user2?: User;

  @OneToMany(() => ChatMessage, message => message.chat)
  messages?: ChatMessage[];
} 