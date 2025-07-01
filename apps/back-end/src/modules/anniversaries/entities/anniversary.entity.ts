import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Anniversary as SharedAnniversary } from '@use-navi-date/shared';
import { Couple } from '../../couples/entities/couple.entity';

@Entity('anniversaries')
export class Anniversary implements SharedAnniversary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  couple_id: string;

  @Column()
  title: string;

  @Column('date')
  date: Date;

  @Column({ type: 'enum', enum: ['NONE', 'YEARLY'] })
  repeat: 'NONE' | 'YEARLY';

  @Column({ nullable: true })
  memo?: string;

  @Column()
  created_by: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Couple, { nullable: true })
  @JoinColumn({ name: 'couple_id' })
  couple?: Couple;
} 