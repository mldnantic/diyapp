import { Module } from '@nestjs/common';
import { ValuesService } from './values.service';
import { ValuesController } from './values.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Value } from './models/value.entity';
import { Property } from 'src/properties/models/property.entity';
import { Item } from 'src/items/models/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Value, Property, Item])],
  providers: [ValuesService],
  controllers: [ValuesController]
})
export class ValuesModule { }
