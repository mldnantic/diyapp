import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ValuesService } from './values.service';
import { Value } from './models/value.entity';
import { ValueDto } from './models/value.dto';

@Controller('values')
export class ValuesController {
  constructor(private readonly valuesService: ValuesService) { }

  @Post()
  async addValue(@Body() dto: ValueDto) {
    return this.valuesService.addValue(dto);
  }

}
