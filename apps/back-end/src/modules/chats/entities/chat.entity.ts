import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ChatMessage } from './chat-message.entity';
import { Chat as ChatInterface } from '@use-navi-date/shared';

@Entity('chats')
export class Chat implements ChatInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userAId: number;

  @Column()
  userBId: number;

  @Column('text')
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({ default: false })
  isDeleted?: boolean;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'userAId' })
  user1?: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'userBId' })
  user2?: User;

  @OneToMany(() => ChatMessage, message => message.chat)
  messages?: ChatMessage[];
} 