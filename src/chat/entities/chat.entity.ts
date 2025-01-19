import { Message } from 'src/message/entities/message.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  lastMessage: string;

  @ManyToMany(() => User, (user) => user.chats)
  participants: User[];

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];
}
