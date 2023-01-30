import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Relation, PrimaryColumn } from 'typeorm'
import { Users } from './Users'

@Entity()
export class Clients {
    @PrimaryGeneratedColumn()
    @PrimaryColumn()
    client_id: number

    @Column()
    name: string

    @OneToMany(() => Users, user => user.client, { cascade: true })
    users: Relation<Users[]>
}