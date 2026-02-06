import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoryDto } from './models/category.dto';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {

    constructor(private readonly categoryService: CategoriesService) { }

    @Get()
    async getCategories() {
        return this.categoryService.get();
    }

    @Post()
    async create(@Body() dto: CategoryDto) {
        return this.categoryService.create(dto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.categoryService.delete(id);
    }

}
