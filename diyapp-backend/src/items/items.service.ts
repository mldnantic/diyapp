import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './models/item.entity';
import { Category } from 'src/categories/models/category.entity';
import { Repository } from 'typeorm';
import { ItemDto } from './models/item.dto';

@Injectable()
export class ItemsService {

    constructor(
        @InjectRepository(Item) private itemsRepository: Repository<Item>,
        @InjectRepository(Category) private categoryRepository: Repository<Category>
    ) { }

    public getAll() {
        return this.itemsRepository.find();
    }

    public getById(id: number) {
        return this.itemsRepository.findOneBy({ id });
    }

    public async create(partDto: ItemDto) {
        const category = await this.categoryRepository.findOneBy({ id: partDto.categoryId });
        if (!category) {
            throw new Error('Category doesnt exist!');
        }
        const part = this.itemsRepository.create({
            name: partDto.name,
            price: partDto.price,
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
