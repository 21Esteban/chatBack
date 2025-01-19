// import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Chat } from 'src/chat/entities/chat.entity';
import { Message } from 'src/message/entities/message.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  // "This exclude property works for responses only if the entity is returned in the response. It does not work if a plain object is returned."
  // @Exclude()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  // Relación muchos a muchos con la tabla `Chat`
  @ManyToMany(() => Chat, (chat) => chat.participants)
  @JoinTable() // Necesario para crear la tabla intermedia
  chats: Chat[];

  // User relations to messages , one user can have many messages but one message only has one user
  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.password);
  }
}
