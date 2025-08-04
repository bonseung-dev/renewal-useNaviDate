import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Couple as CoupleInterface } from '@use-navi-date/shared';

@Entity('couples')
export class Couple implements CoupleInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userAId: number;

  @Column({ nullable: true })
  userBId: number | null;

  @Column()
  anniversary: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ['pending', 'confirm', 'delete'] })
  status: 'pending' | 'confirm' | 'delete';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'userAId' })
  userA?: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'userBId' })
  userB?: User;
} 