import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Posts } from './post';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Posts, (post) => post.user)
  posts: Posts[];
}
