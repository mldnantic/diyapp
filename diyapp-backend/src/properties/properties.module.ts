import { Module } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { Property } from './models/property.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/categories/models/category.entity';
import { Value } from 'src/values/models/value.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Property, Category, Value])],
  providers: [PropertiesService],
  controllers: [PropertiesController]
})
export class PropertiesModule {}
