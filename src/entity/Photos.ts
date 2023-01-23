import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()

export class Photos {
    @PrimaryGeneratedColumn()
    photo_id: number

    @Column()
    photo_name: string

    @Column()
    user_id: number

    @ManyToOne(() => User, user => user.photos)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' }) user: User
}