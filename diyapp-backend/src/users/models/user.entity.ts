import { Project } from "src/projects/models/project.entity";
import { Receipt } from "src/receipts/models/receipt.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column({ nullable: true })
    profilePicture: string;

    @OneToMany(() => Project, project => project.user)
    projects: Project[];

    @OneToMany(()=> Receipt, receipt => receipt.user)
    receipts: Receipt[];

    @Column()
    role: string;
}