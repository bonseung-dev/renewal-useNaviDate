import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Couple } from '../../couples/entities/couple.entity';
import { Anniversary as AnniversaryInterface } from '@use-navi-date/shared';

@Entity('anniversaries')
export class Anniversary implements AnniversaryInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  coupleId: number;

  @Column()
  title: string;

  @Column('date')
  date: Date;

  @Column({ type: 'enum', enum: ['NONE', 'YEARLY'], default: 'NONE' })
  repeat: 'NONE' | 'YEARLY';

  @Column({ nullable: true })
  memo?: string;

  @Column()
  createdBy: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Couple, { nullable: true })
  @JoinColumn({ name: 'coupleId' })
  couple?: Couple;
} 