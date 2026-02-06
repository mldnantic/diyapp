import { Item } from "src/items/models/item.entity";
import { Property } from "src/properties/models/property.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Property, (property) => property.category)
    properties: Property[];

    @OneToMany(() => Item, (part) => part.category)
    parts: Item[];
}