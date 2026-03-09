import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Project } from './project.entity';
import { Item } from 'src/items/models/item.entity';

@Entity()
export class ProjectItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, project => project.items)
  project: Project;

  @ManyToOne(() => Item, item => item.projectItems, { eager: true })
  item: Item;

  @Column()
  quantity: number;
}
