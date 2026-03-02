import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './models/item.entity';
import { Category } from 'src/categories/models/category.entity';
import { Value } from 'src/values/models/value.entity';
import { Property } from 'src/properties/models/property.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Category, Property, Value])],
  providers: [ItemsService],
  controllers: [ItemsController]
})
export class ItemsModule {}
