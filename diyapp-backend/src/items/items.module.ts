import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './models/item.entity';
import { Category } from 'src/categories/models/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Category])],
  providers: [ItemsService],
  controllers: [ItemsController]
})
export class ItemsModule {}
