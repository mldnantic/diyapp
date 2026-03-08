import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receipt } from './models/receipt.entity';
import { User } from 'src/users/models/user.entity';
import { Project } from 'src/projects/models/project.entity';
import { ReceiptDto } from './models/receipt.dto';

@Injectable()
export class ReceiptsService {
    constructor(
        @InjectRepository(Receipt) private receiptRepo: Repository<Receipt>,
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Project) private projectRepo: Repository<Project>,
    ) { }

    async createReceipt(dto: ReceiptDto): Promise<Receipt> {
        const user = await this.userRepo.findOneBy({ id: dto.userId });
        if (!user) throw new NotFoundException('User not found');

        const project = await this.projectRepo.findOne({
            where: { id: dto.projectId },
            relations: ['items', 'items.item'],
        });
        if (!project) throw new NotFoundException('Project not found');

        const content = project.items
            .map(pi => `${pi.item.name} x${pi.quantity}`)
            .join('\n');

        const total = project.items.reduce((sum, pi) => {
            return sum + pi.item.price * pi.quantity;
        }, 0);

        const receipt = this.receiptRepo.create({
            content,
            total,
            user,
        });

        return this.receiptRepo.save(receipt);
    }

    findAll() {
        return this.receiptRepo.find({ relations: ['user'] });
    }

    async findOne(id: number) {
        const receipt = await this.receiptRepo.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!receipt) throw new NotFoundException('Receipt not found');
        return receipt;
    }

    async remove(id: number) {
        const receipt = await this.findOne(id);
        return this.receiptRepo.remove(receipt);
    }
}
