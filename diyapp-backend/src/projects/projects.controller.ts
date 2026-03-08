import { Controller, Post, Get, Param, Body, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectDto, ProjectItemDto } from './models/project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Post()
  create(@Body() dto: ProjectDto) {
    return this.projectService.createProject(dto);
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  getProject(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.getProject(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: ProjectDto) {
    return this.projectService.updateProject(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.removeProject(id);
  }

  @Post(':id/items')
  addItem(@Param('id', ParseIntPipe) id: number, @Body() dto: ProjectItemDto) {
    return this.projectService.addItemToProject(id, dto);
  }

  @Delete(':id/items/:itemId')
  removeItem(@Param('id', ParseIntPipe) id: number, @Param('itemId', ParseIntPipe) itemId: number) {
    return this.projectService.removeItemFromProject(id, itemId);
  }
}
