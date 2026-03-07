import { Item } from "src/items/models/item.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({ length: 200 })
    content: string;

    @CreateDateColumn({ type: 'timestamp', precision: 0 })
    createdAt: Date;

    @ManyToOne(() => Item, (item) => item.comments, { onDelete: 'CASCADE' })
    item: Item;
}
