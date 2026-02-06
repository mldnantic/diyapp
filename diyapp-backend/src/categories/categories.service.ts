import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './models/category.entity';
import { Repository } from 'typeorm';
import { CategoryDto } from './models/category.dto';

@Injectable()
export class CategoriesService {

    constructor(
        @InjectRepository(Category)
        private categoryRepo: Repository<Category>,
    ) { }

    async get() {
        return await this.categoryRepo.find();
    }

    async create(dto: CategoryDto) {
        const category = this.categoryRepo.create({
            name: dto.name
        });
        return await this.categoryRepo.save(category);
    }

    async delete(id: number) {
        return await this.categoryRepo.delete(id);
    }

}
