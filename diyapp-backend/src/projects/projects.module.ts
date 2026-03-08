import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from 'src/items/models/item.entity';
import { Project } from './models/project.entity';
import { User } from 'src/users/models/user.entity';
import { ProjectItem } from './models/project-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Project, ProjectItem, User])],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {}
