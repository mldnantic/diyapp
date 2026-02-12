import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemDto } from './models/item.dto';

@Controller('items')
export class ItemsController {

    constructor(private itemsService: ItemsService) { }

    @Get()
    public getItems() {
        return this.itemsService.getAll();
    }

    @Get(':id')
    public getItem(@Param('id', ParseIntPipe) id: number) {
        return this.itemsService.getById(id);
    }

    @Post()
    public addItem(@Body() dto: ItemDto) {
        return this.itemsService.create(dto);
    }

    @Delete(':id')
    public deleteItem(@Param('id', ParseIntPipe) id: number) {
        return this.itemsService.delete(id);
    }

    @Put(':id')
    public async updateItem(@Param('id', ParseIntPipe) id: number, @Body() dto: ItemDto) {
        return this.itemsService.update(id, dto);
    }
}
