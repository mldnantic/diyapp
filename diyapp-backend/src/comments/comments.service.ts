import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from 'src/comments/models/comment.entity';
import { Item } from 'src/items/models/item.entity';
import { CommentDto } from './models/comment.dto';
import { User } from 'src/users/models/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) { }

  async create(dto: CommentDto) {
    const item = await this.itemsRepository.findOne({ where: { id: dto.itemId } });
    if (!item) {
      throw new NotFoundException(`Item with id ${dto.itemId} not found`);
    }
    const user = await this.usersRepository.findOne({where: {id: dto.userId}});
    if(!user) {
      throw new NotFoundException(`User with id ${dto.userId} not found`);
    }
    const comment = this.commentsRepository.create({
      ...dto,
      item: item,
      user: user
    });
    const newComment = await this.commentsRepository.save(comment);

    return {
      userId: newComment.user.id,
      content: newComment.content,
      createdAt: newComment.createdAt,
      itemId: newComment.item.id
    }
  }

  async getComments() {
    return await this.commentsRepository.find();
  }

  async getCommentsForItem(itemId: number) {
    return await this.commentsRepository.find({
      where: { item: { id: itemId } }
    });
  }

  async findOne(id: number) {
    const comment = await this.commentsRepository.findOne({ where: { id }, relations: ['item'] });
    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }
    return comment;
  }

  async remove(id: number) {
    const comment = await this.findOne(id);
    await this.commentsRepository.remove(comment);
  }
}
