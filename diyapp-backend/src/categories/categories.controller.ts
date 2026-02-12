import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CategoryDto } from './models/category.dto';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {

    constructor(private readonly categoryService: CategoriesService) { }

    @Get()
    async getCategories() {
        return this.categoryService.getAll();
    }

    @Post()
    async create(@Body() dto: CategoryDto) {
        return this.categoryService.create(dto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.categoryService.delete(id);
    }
    
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: CategoryDto) {
        return this.categoryService.update(id, dto);
    }
    
}
