import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Couple } from '../../couples/entities/couple.entity';

@Entity('anniversaries')
export class Anniversary {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  coupleId: string;

  @Column()
  title: string;

  @Column('date')
  date: Date;

  @Column({ type: 'enum', enum: ['NONE', 'YEARLY'] })
  repeat: 'NONE' | 'YEARLY';

  @Column({ nullable: true })
  memo?: string;

  @Column()
  createdBy: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Couple, { nullable: true })
  @JoinColumn({ name: 'coupleId' })
  couple?: Couple;
} 