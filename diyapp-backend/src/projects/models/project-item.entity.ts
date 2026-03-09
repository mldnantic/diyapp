import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Project } from './project.entity';
import { Item } from 'src/items/models/item.entity';

@Entity()
export class ProjectItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, project => project.items, {onDelete: 'CASCADE'})
  project: Project;

  @ManyToOne(() => Item, item => item.projectItems)
  item: Item;

  @Column()
  quantity: number;
}
