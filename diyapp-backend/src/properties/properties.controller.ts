import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertyDto } from './models/property.dto';

@Controller('properties')
export class PropertiesController {

    constructor(private readonly propertyService: PropertiesService) { }

    @Get(':categoryId')
    async get(@Param('categoryId', ParseIntPipe) id: number) {
        return this.propertyService.get(id);
    }

    @Post()
    async create(@Body() dto: PropertyDto) {
        return this.propertyService.create(dto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.propertyService.delete(id);
    }
    
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: PropertyDto) {
        return this.propertyService.update(id, dto);
    }

}
