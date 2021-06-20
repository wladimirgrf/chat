import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { User } from './User';

@Entity('connections')
class Connection {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'socket_id' })
  socketId: string;

  @Column({ name: 'admin_id' })
  adminId: string;

  @Column({ name: 'user_id' })
  userId: string;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User)
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Connection };
