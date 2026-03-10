import { Controller, Post, Get, Param, Body, Put, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectDto, ProjectItemDto } from './models/project.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'moderator', 'user')
  @Post()
  createProject(@Body() dto: ProjectDto) {
    return this.projectService.createProject(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'moderator', 'user')
  @Get('/user/:id')
  findProjectsOfUser(@Param('id', ParseIntPipe) userId: number) {
    return this.projectService.findProjectsOfUser(userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'moderator', 'user')
  @Get(':id')
  getProject(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.getProject(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'moderator', 'user')
  @Get('/items/:id')
  getItemsOfProject(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.getItemsOfProject(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'moderator', 'user')
  @Delete(':id')
  deleteProject(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.deleteProject(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'moderator', 'user')
  @Post(':id/items')
  addItemToProject(@Param('id', ParseIntPipe) id: number, @Body() dto: ProjectItemDto) {
    return this.projectService.addItemToProject(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'moderator', 'user')
  @Delete(':id/items/:itemId')
  removeItemFromProject(@Param('id', ParseIntPipe) id: number, @Param('itemId', ParseIntPipe) itemId: number) {
    return this.projectService.removeItemFromProject(id, itemId);
  }
}
