import { User } from 'src/users/models/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Receipt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  total: number;

  @ManyToOne(() => User, user => user.receipts)
  user: User;
}
