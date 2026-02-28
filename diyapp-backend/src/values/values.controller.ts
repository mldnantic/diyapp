import { Controller, Post, Get, Param, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { ValuesService } from './values.service';
import { ValueDto } from './models/value.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('values')
export class ValuesController {
  constructor(private readonly valuesService: ValuesService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  async addValue(@Body() dto: ValueDto) {
    return this.valuesService.addValue(dto);
  }

  @Get('item/:itemId')
  async getValuesOfItem(@Param('itemId') itemId: number) {
    return this.valuesService.getValuesOfItem(itemId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id')
  async updateValue(@Param('id') id: number, @Body() dto: ValueDto) {
    return this.valuesService.updateValue(id, dto);
  }
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async deleteValue(@Param('id') id: number) {
    return this.valuesService.deleteValue(id);
  }
}
