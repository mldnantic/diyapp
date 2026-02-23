import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Value } from './models/value.entity';
import { Item } from 'src/items/models/item.entity';
import { Property } from 'src/properties/models/property.entity';
import { ValueDto } from './models/value.dto';

@Injectable()
export class ValuesService {
    constructor(
        @InjectRepository(Value) private valuesRepo: Repository<Value>,
        @InjectRepository(Item) private itemsRepo: Repository<Item>,
        @InjectRepository(Property) private propertiesRepo: Repository<Property>,
    ) { }

    async addValue(valueDto: ValueDto): Promise<Value> {
        const item = await this.itemsRepo.findOne({
            where: { id: valueDto.itemId },
            relations: ['category'],
        });
        const property = await this.propertiesRepo.findOne({
            where: { id: valueDto.propertyId },
            relations: ['category'],
        });

        if (!item || !property) {
            throw new Error('Item or Property not found');
        }

        if (item.category.id !== property.category.id) {
            throw new Error(
                `Item (category ${item.category.name}) and Property (category ${property.category.name}) do not match`,
            );
        }

        const value = this.valuesRepo.create({
            value: valueDto.value,
            item,
            property
        });

        return this.valuesRepo.save(value);
    }

}
