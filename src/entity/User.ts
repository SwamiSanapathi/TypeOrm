import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Level } from './Level';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    user_parent_id: number;

    @ManyToOne(type => Level, level => level.users)
    level: Level;
}