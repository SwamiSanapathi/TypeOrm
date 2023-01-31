import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from './User'

@Entity()

@Entity()
export class Level {
  @PrimaryGeneratedColumn()
  level_id: number;

  @Column()
  level: number;

  @OneToMany(type => User, user => user.level)
  users: User[];
}