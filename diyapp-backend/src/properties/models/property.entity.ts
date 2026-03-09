import { Category } from "src/categories/models/category.entity";
import { Value } from "src/values/models/value.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Property {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @ManyToOne(() => Category, (category) => category.properties, { onDelete: "CASCADE" })
    category: Category;

    @OneToMany(() => Value, value => value.property, { onDelete: "CASCADE" })
    values: Value[];
}