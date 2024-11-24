import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  Email: string;

  @Column()
  number: string;

  @Column()
  // "This exclude property works for responses only if the entity is returned in the response. It does not work if a plain object is returned."
  @Exclude()
  password: string;

  @Column({ default: true })
  isActive: boolean;
}
