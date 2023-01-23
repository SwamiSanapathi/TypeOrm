import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm'
import { Profile } from './Profile'
import { Photos } from './Photos'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    profile_id: number

    @OneToOne(() => Profile)
    @JoinColumn({ name: 'profile_id', referencedColumnName: 'id' }) profile: Profile

    @OneToMany(() => Photos, photo => photo.user)
    @JoinColumn({ name: 'id', referencedColumnName: 'user_id' }) photos: Photos[]
}