import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Clients } from "./Clients";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    @PrimaryColumn()
    user_id: number

    @Column()
    name: string

    @Column()
    client_id: number

    @ManyToOne(() => Clients, client => client.users, )
    @JoinColumn({ name: 'client_id', referencedColumnName: 'client_id' })
    client: Relation<Clients>
}