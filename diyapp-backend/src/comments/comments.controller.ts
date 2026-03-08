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

  @Get()
  async getComments() {
    return this.commentsService.getComments();
  }

  @Get(':itemid')
  async getCommentsForItem(@Param('itemid', ParseIntPipe) itemId: number) {
    return this.commentsService.getCommentsForItem(itemId);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.commentsService.remove(id);
  }
}
