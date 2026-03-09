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
  ) { }

  async createProject(dto: ProjectDto) {
    const user = await this.userRepo.findOneBy({ id: dto.userId });
    if (!user) throw new NotFoundException('User not found');

    const project = this.projectRepo.create({
      name: dto.name,
      user: user,
      items: [],
    });
    const newProject = await this.projectRepo.save(project);
    return {
      id: newProject.id,
      name: newProject.name,
      userId: newProject.user.id
    }
  }

  async findProjectsOfUser(userId: number) {
    const projects = await this.projectRepo.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    return projects.map(project => ({
      id: project.id,
      name: project.name,
      userId: project.user.id,
    }));
  }

  async getProject(id: number) {
    const project = await this.projectRepo.findOne({
      where: { id }
    });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async deleteProject(id: number) {
    const project = await this.getProject(id);
    if (!project) throw new NotFoundException('Project not found');
    return this.projectRepo.delete(project.id);
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
