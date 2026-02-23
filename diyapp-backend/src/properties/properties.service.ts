import { Injectable } from '@nestjs/common';
import { Property } from './models/property.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/models/category.entity';
import { PropertyDto } from './models/property.dto';

@Injectable()
export class PropertiesService {

    constructor(
        @InjectRepository(Property) private propertyRepo: Repository<Property>,
        @InjectRepository(Category) private categoryRepo: Repository<Category>
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
            throw new Error('Category doesnt exist!');
        }
        const property = this.propertyRepo.create({
            name: propertyDto.name,
            category
        });
        return await this.propertyRepo.save(property);
    }

    async deleteProperty(id: number) {
        return await this.propertyRepo.delete(id);
    }

    async updateProperty(id: number, dto: PropertyDto) {
        return await this.propertyRepo.update(id, dto);
    }

}
