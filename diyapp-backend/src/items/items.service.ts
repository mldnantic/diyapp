import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './models/item.entity';
import { Category } from 'src/categories/models/category.entity';
import { Repository } from 'typeorm';
import { ItemDto } from './models/item.dto';
import { Property } from 'src/properties/models/property.entity';
import { Value } from 'src/values/models/value.entity';
import * as fs from 'fs';
import path from 'path';

@Injectable()
export class ItemsService {

    constructor(
        @InjectRepository(Item) private itemsRepository: Repository<Item>,
        @InjectRepository(Category) private categoryRepository: Repository<Category>,
        @InjectRepository(Property) private propertyRepository: Repository<Property>,
        @InjectRepository(Value) private valueRepository: Repository<Value>,
    ) { }

    public async getFromCategories(categoryIds: string) {
        const catIds = categoryIds.split(',').map(Number);
        return await this.itemsRepository
            .createQueryBuilder('item')
            .select(['item.id', 'item.name', 'item.price', 'item.categoryId', 'item.image'])
            .where('item.categoryId IN (:...catIds)', { catIds })
            .getMany();
    }

    public async getById(id: number) {
        return await this.itemsRepository.findOneBy({ id });
    }

    public async create(itemDto: ItemDto) {
        const category = await this.categoryRepository.findOneBy({
            id: itemDto.categoryId
        });
        if (!category) {
            throw new Error('Category doesnt exist!');
        }
        const item = this.itemsRepository.create({
            name: itemDto.name,
            price: itemDto.price,
            category
        });
        const newItem = await this.itemsRepository.save(item);

        const props = await this.propertyRepository.find({
            where: { category: { id: category.id } }
        })

        const vals = props.map((property) =>
            this.valueRepository.create({
                value: "N/A",
                item: newItem,
                property: property
            })
        )

        await this.valueRepository.save(vals);

        return newItem;
    }

    public async uploadItemImage(id: number, filePath: string) {
        const item = await this.itemsRepository.findOneBy({
            id: id
        });

        if (!item) {
            throw new NotFoundException("Item not found!");
        }

        if (item.image) {
            try {
                await fs.promises.unlink(path.resolve(item.image));
            }
            catch (err) {
                throw new Error("Failed to delete image!", err);
            }
        }

        item.image = filePath;
        return this.itemsRepository.save(item);
    }

    public async delete(id: number) {
        const item = await this.itemsRepository.findOneBy({
            id: id
        });

        if (!item) {
            throw new NotFoundException("Item not found!");
        }

        if (item.image) {
            try {
                await fs.promises.unlink(path.resolve(item.image));
            }
            catch (err) {
                throw new Error("Failed to delete image!", err);
            }
        }

        return await this.itemsRepository.delete(id);
    }

    public async update(id: number, dto: ItemDto) {
        return await this.itemsRepository.update(id, dto);
    }

}
