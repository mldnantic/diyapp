import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertyDto } from './models/property.dto';

@Controller('properties')
export class PropertiesController {

    constructor(private readonly propertyService: PropertiesService) { }

    @Get(':categoryId')
    async get(@Param('categoryId') id: number) {
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
}
