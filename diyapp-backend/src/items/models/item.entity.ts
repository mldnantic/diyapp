import { Category } from "src/categories/models/category.entity";
import { Value } from "src/values/models/value.entity";
import { Comment } from "src/comments/models/comment.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProjectItem } from "src/projects/models/project-item.entity";

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column({default: 0})
    viewCount: number;

    @Column()
    categoryId: number;

    @Column({ nullable: true })
    image: string;

    @OneToMany(() => Comment, (comment) => comment.item)
    comments: Comment[];

    @ManyToOne(() => Category, (category) => category.items, { onDelete: "CASCADE" })
    @JoinColumn({ name: "categoryId" })
    category: Category;

    @OneToMany(() => Value, value => value.item)
    values: Value[];

    @OneToMany(() => ProjectItem, projectItem => projectItem.item)
    projectItems: ProjectItem[];
}
