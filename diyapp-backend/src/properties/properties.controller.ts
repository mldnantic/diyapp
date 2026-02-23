import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertyDto } from './models/property.dto';

@Controller('properties')
export class PropertiesController {

    constructor(private readonly propertyService: PropertiesService) { }

    @Get(':categoryId')
    async getCategoryProperties(@Param('categoryId', ParseIntPipe) id: number) {
        return this.propertyService.getCategoryProperties(id);
    }

    @Post()
    async addProperty(@Body() dto: PropertyDto) {
        return this.propertyService.addProperty(dto);
    }

    @Delete(':id')
    async deleteProperty(@Param('id') id: number) {
        return this.propertyService.deleteProperty(id);
    }
    
    @Put(':id')
    async updateProperty(@Param('id', ParseIntPipe) id: number, @Body() dto: PropertyDto) {
        return this.propertyService.updateProperty(id, dto);
    }

}
