import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Couple as SharedCouple } from '@use-navi-date/shared';
import { User } from '../../users/entities/user.entity';

@Entity('couples')
export class Couple implements SharedCouple {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_a_id: string;

  @Column({ nullable: true })
  user_b_id: string | null;

  @Column()
  anniversary: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ['pending', 'confirm', 'delete'] })
  status: 'pending' | 'confirm' | 'delete';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_a_id' })
  user1?: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_b_id' })
  user2?: User;
} 