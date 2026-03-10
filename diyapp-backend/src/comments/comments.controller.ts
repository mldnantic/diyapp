import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDto } from './models/comment.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'moderator', 'user')
  @Post()
  async create(@Body() dto: CommentDto) {
    return this.commentsService.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'moderator')
  @Get('reported')
  async getReportedComments() {
    return this.commentsService.getReportedComments();
  }

  @Get('/item/:itemid')
  async getCommentsForItem(@Param('itemid', ParseIntPipe) itemId: number) {
    return this.commentsService.getCommentsForItem(itemId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'moderator', 'user')
  @Put(':id')
  async reportComment(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.reportComment(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'moderator')
  @Put('/unreport/:id')
  async unreportComment(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.unreportComment(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'moderator')
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.commentsService.delete(id);
  }

}
