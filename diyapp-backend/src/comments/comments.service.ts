import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from 'src/comments/models/comment.entity';
import { Item } from 'src/items/models/item.entity';
import { CommentDto } from './models/comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) { }

  async create(dto: CommentDto) {
    const item = await this.itemRepository.findOne({ where: { id: dto.itemId } });
    if (!item) {
      throw new NotFoundException(`Item with id ${dto.itemId} not found`);
    }

    const comment = this.commentRepository.create({
      ...dto,
      item: item
    });
    return await this.commentRepository.save(comment);
  }

  async getComments() {
    return await this.commentRepository.find();
  }

  async getCommentsForItem(itemId: number) {
    return await this.commentRepository.find({
      where: { item: { id: itemId } }
    });
  }

  async findOne(id: number) {
    const comment = await this.commentRepository.findOne({ where: { id }, relations: ['item'] });
    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }
    return comment;
  }

  async update(id: number, content: string) {
    const comment = await this.findOne(id);
    comment.content = content;
    return this.commentRepository.save(comment);
  }

  async remove(id: number) {
    const comment = await this.findOne(id);
    await this.commentRepository.remove(comment);
  }
}
