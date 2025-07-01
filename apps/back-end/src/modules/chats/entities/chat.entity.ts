import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ChatMessage } from './chat-message.entity';

@Entity('chats')
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userAId: string;

  @Column()
  userBId: string;

  @Column('text')
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'userAId' })
  user1?: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'userBId' })
  user2?: User;

  @OneToMany(() => ChatMessage, message => message.chat)
  messages?: ChatMessage[];
} 