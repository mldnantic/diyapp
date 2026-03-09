import { User } from 'src/users/models/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { ProjectItem } from './project-item.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @ManyToOne(() => User, user => user.projects)
  user: User;

  @OneToMany(() => ProjectItem, projectItem => projectItem.project, { cascade: true })
  items: ProjectItem[];
}
