import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common';

import { TasksService } from './tasks.service';

import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    try {
      return await this.tasksService.create(createTaskDto);
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.tasksService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.tasksService.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    try {
      return await this.tasksService.update(id, updateTaskDto);
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.tasksService.remove(id);
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }
}