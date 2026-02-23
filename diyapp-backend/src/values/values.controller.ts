import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { ValuesService } from './values.service';
import { ValueDto } from './models/value.dto';

@Controller('values')
export class ValuesController {
  constructor(private readonly valuesService: ValuesService) {}

  @Post()
  async addValue(@Body() dto: ValueDto) {
    return this.valuesService.addValue(dto);
  }

  @Get('item/:itemId')
  async getValuesOfItem(@Param('itemId') itemId: number) {
    return this.valuesService.getValuesOfItem(itemId);
  }

  @Put(':id')
  async updateValue(@Param('id') id: number, @Body() dto: ValueDto) {
    return this.valuesService.updateValue(id, dto);
  }

  @Delete(':id')
  async deleteValue(@Param('id') id: number) {
    return this.valuesService.deleteValue(id);
  }
}
