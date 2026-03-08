import { Module } from '@nestjs/common';
import { ReceiptsController } from './receipts.controller';
import { ReceiptsService } from './receipts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/projects/models/project.entity';
import { ProjectItem } from 'src/projects/models/project-item.entity';
import { User } from 'src/users/models/user.entity';
import { Receipt } from './models/receipt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectItem, User, Receipt])],
  controllers: [ReceiptsController],
  providers: [ReceiptsService]
})
export class ReceiptsModule { }
