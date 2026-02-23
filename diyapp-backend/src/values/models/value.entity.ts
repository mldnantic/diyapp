import { Item } from 'src/items/models/item.entity';
import { Property } from 'src/properties/models/property.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Value {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @ManyToOne(() => Item, item => item.values, { onDelete: 'CASCADE' })
  item: Item;

  @ManyToOne(() => Property, property => property.values, { onDelete: 'CASCADE' })
  property: Property;
}
