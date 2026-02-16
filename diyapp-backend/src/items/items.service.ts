import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './models/item.entity';
import { Category } from 'src/categories/models/category.entity';
import { In, Repository } from 'typeorm';
import { ItemDto } from './models/item.dto';

@Injectable()
export class ItemsService {

    constructor(
        @InjectRepository(Item) private itemsRepository: Repository<Item>,
        @InjectRepository(Category) private categoryRepository: Repository<Category>
    ) { }

    public async getFromCategories(categoryIds: string) {
        const catIds = categoryIds.split(',').map(Number);
        return await this.itemsRepository
            .createQueryBuilder('item')
            .leftJoinAndSelect('item.category', 'category')
            .where('category.id IN (:...catIds)', { catIds })
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
            throw new Error('Item doesnt exist!');
        }
        const part = this.itemsRepository.create({
            name: itemDto.name,
            price: itemDto.price,
            category
        });
        return await this.itemsRepository.save(part);
    }

    public async delete(id: number) {
        return await this.itemsRepository.delete(id);
    }

    public async update(id: number, dto: ItemDto) {
        return await this.itemsRepository.update(id, dto);
    }

}
