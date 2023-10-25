import { User } from "src/User/entity/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity()
export class Rocco {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:false,unique:true})
    passKey:string;

    @OneToOne(() => User,{cascade:true})
    @JoinColumn()
    user:User;

    @CreateDateColumn()
    createdDate: Date = new Date();

    @UpdateDateColumn()
    updatedDate: Date = new Date()
}