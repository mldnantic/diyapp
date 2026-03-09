import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDto } from './models/comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Post()
  async create(@Body() dto: CommentDto) {
    return this.commentsService.create(dto);
  }

  @Get('reported')
  async getReportedComments() {
    return this.commentsService.getReportedComments();
  }

  @Get('/item/:itemid')
  async getCommentsForItem(@Param('itemid', ParseIntPipe) itemId: number) {
    return this.commentsService.getCommentsForItem(itemId);
  }

  @Put(':id')
  async reportComment(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.reportComment(id);
  }

  @Put('/unreport/:id')
  async unreportComment(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.unreportComment(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.commentsService.delete(id);
  }

}
