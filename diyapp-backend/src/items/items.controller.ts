import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemDto } from './models/item.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('items')
export class ItemsController {

    constructor(private itemsService: ItemsService) { }

    @Get()
    public getItemsFromCategories(@Query('categoryIds') categoryIds: string) {
        return this.itemsService.getFromCategories(categoryIds);
    }

    @Get(':id')
    public getItem(@Param('id', ParseIntPipe) id: number) {
        return this.itemsService.getById(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post()
    public addItem(@Body() dto: ItemDto) {
        return this.itemsService.create(dto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Delete(':id')
    public deleteItem(@Param('id', ParseIntPipe) id: number) {
        return this.itemsService.delete(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Put(':id')
    public async updateItem(@Param('id', ParseIntPipe) id: number, @Body() dto: ItemDto) {
        return this.itemsService.update(id, dto);
    }
}
