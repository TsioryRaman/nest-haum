import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:false,unique:true})
    username:string;

    @Column({nullable:true,unique:true})
    email:string;

    @Column({nullable:true})
    lastname:string;

    @Column({nullable:false})
    password:string;

    @Column({nullable:false})
    address:string;

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date
}