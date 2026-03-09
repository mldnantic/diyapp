import { Controller, Post, Get, Param, Body, Delete, ParseIntPipe } from '@nestjs/common';
import { ReceiptDto } from './models/receipt.dto';
import { ReceiptsService } from './receipts.service';

@Controller('receipts')
export class ReceiptsController {
  constructor(private readonly receiptService: ReceiptsService) {}

  @Post()
  createReceipt(@Body() dto: ReceiptDto) {
    return this.receiptService.createReceipt(dto);
  }

  @Get('/user/:id')
  getReceiptsOfUser(@Param('id', ParseIntPipe) userId: number) {
    return this.receiptService.getReceiptsOfUser(userId);
  }

}
