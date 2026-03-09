import { Controller, Post, Get, Param, Body, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectDto, ProjectItemDto } from './models/project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Post()
  createProject(@Body() dto: ProjectDto) {
    return this.projectService.createProject(dto);
  }

  @Get('/user/:id')
  findProjectsOfUser(@Param('id', ParseIntPipe) userId: number) {
    return this.projectService.findProjectsOfUser(userId);
  }

  @Get(':id')
  getProject(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.getProject(id);
  }

  @Delete(':id')
  deleteProject(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.deleteProject(id);
  }

  @Post(':id/items')
  addItemToProject(@Param('id', ParseIntPipe) id: number, @Body() dto: ProjectItemDto) {
    return this.projectService.addItemToProject(id, dto);
  }

  @Delete(':id/items/:itemId')
  removeItemFromProject(@Param('id', ParseIntPipe) id: number, @Param('itemId', ParseIntPipe) itemId: number) {
    return this.projectService.removeItemFromProject(id, itemId);
  }
}
