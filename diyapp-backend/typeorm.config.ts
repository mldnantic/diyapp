import { Category } from "src/categories/models/category.entity";
import { Item } from "src/items/models/item.entity";
import { Property } from "src/properties/models/property.entity";
import { User } from "src/users/models/user.entity";
import { DataSourceOptions } from "typeorm";

export const typeOrmConfig: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "mysecretpassword",
  database: "postgres",
  entities: [User, Category, Property, Item],
  synchronize: true,
};