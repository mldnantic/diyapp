import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertyDto } from './models/property.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('properties')
export class PropertiesController {

    constructor(private readonly propertyService: PropertiesService) { }

    @Get(':categoryId')
    async getCategoryProperties(@Param('categoryId', ParseIntPipe) id: number) {
        return this.propertyService.getCategoryProperties(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post()
    async addProperty(@Body() dto: PropertyDto) {
        return this.propertyService.addProperty(dto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Delete(':id')
    async deleteProperty(@Param('id') id: number) {
        return this.propertyService.deleteProperty(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Put(':id')
    async updateProperty(@Param('id', ParseIntPipe) id: number, @Body() dto: PropertyDto) {
        return this.propertyService.updateProperty(id, dto);
    }

}
