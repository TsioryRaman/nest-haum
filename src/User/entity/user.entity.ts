import { Rocco } from "src/rocco/entity/rocco.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

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

    @OneToOne(()=>Rocco)
    rocco: Rocco;

    @Column({nullable:false})
    address:string;

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date
}