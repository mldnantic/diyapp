import { Category } from "src/categories/models/category.entity";
import { Value } from "src/values/models/value.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Property {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Category, (category) => category.properties, { onDelete: "CASCADE" })
    category: Category;

    @OneToMany(() => Value, value => value.property)
    values: Value[];
}