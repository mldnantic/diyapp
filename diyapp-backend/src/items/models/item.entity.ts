import { Category } from "src/categories/models/category.entity";
import { Value } from "src/values/models/value.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @ManyToOne(() => Category, (category) => category.items, { onDelete: "CASCADE" })
    category: Category;

    @OneToMany(() => Value, value => value.item)
    values: Value[];
}