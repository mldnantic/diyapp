import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './models/project.entity';
import { ProjectItem } from './models/project-item.entity';
import { Item } from 'src/items/models/item.entity';
import { User } from 'src/users/models/user.entity';
import { ProjectDto, ProjectItemDto } from './models/project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private projectRepo: Repository<Project>,
    @InjectRepository(ProjectItem) private projectItemRepo: Repository<ProjectItem>,
    @InjectRepository(Item) private itemRepo: Repository<Item>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async createProject(dto: ProjectDto): Promise<Project> {
    const user = await this.userRepo.findOneBy({ id: dto.userId });
    if (!user) throw new NotFoundException('User not found');

    const project = this.projectRepo.create({
      name: dto.name,
      user: user,
      items: dto.items,
    });
    return this.projectRepo.save(project);
  }

  findAll() {
    return this.projectRepo.find({ relations: ['user', 'items', 'items.item'] });
  }

  async getProject(id: number) {
    const project = await this.projectRepo.findOne({
      where: { id }
    });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async updateProject(id: number, dto: ProjectDto) {
    const project = await this.getProject(id);
    project.name = dto.name ?? project.name;
    return this.projectRepo.save(project);
  }

  async removeProject(id: number) {
    const project = await this.getProject(id);
    return this.projectRepo.remove(project);
  }

  async addItemToProject(projectId: number, dto: ProjectItemDto) {
    const project = await this.getProject(projectId);
    const item = await this.itemRepo.findOneBy({ id: dto.itemId });
    if (!item) throw new NotFoundException('Item not found');

    const projectItem = this.projectItemRepo.create({
      project,
      item,
      quantity: dto.quantity,
    });
    return this.projectItemRepo.save(projectItem);
  }

  async removeItemFromProject(projectId: number, itemId: number) {
    const projectItem = await this.projectItemRepo.findOne({
      where: { project: { id: projectId }, item: { id: itemId } },
      relations: ['project', 'item'],
    });
    if (!projectItem) throw new NotFoundException('ProjectItem not found');
    return this.projectItemRepo.remove(projectItem);
  }
}
