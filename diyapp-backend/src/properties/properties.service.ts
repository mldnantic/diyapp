import { Injectable } from '@nestjs/common';
import { Property } from './models/property.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/models/category.entity';
import { PropertyDto } from './models/property.dto';
import { Value } from 'src/values/models/value.entity';
import { Item } from 'src/items/models/item.entity';

@Injectable()
export class PropertiesService {

    constructor(
        @InjectRepository(Property) private propertyRepo: Repository<Property>,
        @InjectRepository(Category) private categoryRepo: Repository<Category>,
        @InjectRepository(Item) private itemRepo: Repository<Item>,
        @InjectRepository(Value) private valueRepo: Repository<Value>
    ) { }

    async getCategoryProperties(id: number) {
        return await this.propertyRepo.find({
            where: { category: { id: id } }
        });
    }

    async addProperty(propertyDto: PropertyDto) {
        const category = await this.categoryRepo.findOneBy({
            id: propertyDto.categoryId
        });

        if (!category) {
            throw new Error('Category does not exist!');
        }

        const property = this.propertyRepo.create({
            name: propertyDto.name,
            category
        });

        const savedProp = await this.propertyRepo.save(property);

        const items = await this.itemRepo.find({
            where: {category: {id: propertyDto.categoryId}}
        });

        const values = items.map(i=>
            this.valueRepo.create({
                value: 'N/A',
                item: {id: i.id},
                property: {id: savedProp.id}
            })
        );

        await this.valueRepo.save(values);

        return savedProp;
    }

    async deleteProperty(id: number) {
        return await this.propertyRepo.delete(id);
    }

    async updateProperty(id: number, dto: PropertyDto) {
        return await this.propertyRepo.update(id, dto);
    }

}
