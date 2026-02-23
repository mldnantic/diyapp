import { BadRequestException, Injectable } from '@nestjs/common';
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

    async addValue(valueDto: ValueDto) {
        const { item, property } = await this.findItemAndProperty(valueDto.itemId, valueDto.propertyId);
        this.ensureSameCategory(item, property);

        const value = this.valuesRepo.create({
            value: valueDto.value,
            item,
            property
        });

        return await this.valuesRepo.save(value);
    }

    async getValuesOfItem(itemId: number) {
        return await this.valuesRepo.find({
            where: { item: { id: itemId } }
        });
    }

    async getValueById(id: number) {
        const value = await this.valuesRepo.findOne({
            where: { id },
            relations: ['item', 'property'],
        });
        if (!value) {
            throw new Error(`Value with id ${id} not found`);
        }
        return value;
    }

    async updateValue(id: number, valueDto: ValueDto) {
        const value = await this.getValueById(id);

        const { item, property } = await this.findItemAndProperty(valueDto.itemId, valueDto.propertyId);
        this.ensureSameCategory(item, property);

        return this.valuesRepo.update(id, valueDto);
    }

    async deleteValue(id: number) {
        const value = await this.getValueById(id);
        return this.valuesRepo.remove(value);
    }

    private async findItemAndProperty(itemId: number, propertyId: number) {
        const item = await this.itemsRepo.findOne({
            where: { id: itemId },
            relations: ['category'],
        });
        const property = await this.propertiesRepo.findOne({
            where: { id: propertyId },
            relations: ['category'],
        });

        if (!item || !property) {
            throw new BadRequestException({
                statusCode: 400,
                message: 'Item or Property not found',
                error: 'NotFound',
            });
        }

        return { item, property };
    }

    private ensureSameCategory(item: Item, property: Property) {
        if (item.category.id !== property.category.id) {
            throw new BadRequestException({
                statusCode: 400,
                message: `Item (category ${item.category.name}) and Property (category ${property.category.name}) do not match`,
                error: 'CategoryMismatch',
            });
        }
    }
}
