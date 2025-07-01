import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('couples')
export class Couple {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userAId: string;

  @Column({ nullable: true })
  userBId: string | null;

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
  user1?: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'userBId' })
  user2?: User;
} 