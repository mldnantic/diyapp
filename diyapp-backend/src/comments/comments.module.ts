import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Item } from 'src/items/models/item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './models/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Comment])],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
