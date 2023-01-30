import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Clients {
    @PrimaryGeneratedColumn()
    client_id: number

    @Column()
    name: string
}