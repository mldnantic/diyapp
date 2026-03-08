import { Controller, Post, Get, Param, Body, Delete } from '@nestjs/common';
import { ReceiptDto } from './models/receipt.dto';
import { ReceiptsService } from './receipts.service';

@Controller('receipts')
export class ReceiptsController {
  constructor(private readonly receiptService: ReceiptsService) {}

  @Post()
  create(@Body() dto: ReceiptDto) {
    return this.receiptService.createReceipt(dto);
  }

  @Get()
  findAll() {
    return this.receiptService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.receiptService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.receiptService.remove(id);
  }
}
