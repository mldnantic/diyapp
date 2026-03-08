import { Category } from "src/categories/models/category.entity";
import { Item } from "src/items/models/item.entity";
import { Property } from "src/properties/models/property.entity";
import { User } from "src/users/models/user.entity";
import { Value } from "src/values/models/value.entity";
import { Comment } from "src/comments/models/comment.entity";
import { DataSourceOptions } from "typeorm";
import { Project } from "src/projects/models/project.entity";
import { ProjectItem } from "src/projects/models/project-item.entity";
import { Receipt } from "src/receipts/models/receipt.entity";

export const typeOrmConfig: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "mysecretpassword",
  database: "postgres",
  entities: [User, Category, Property, Item, Value, Comment, Project, ProjectItem, Receipt],
  synchronize: true,
};