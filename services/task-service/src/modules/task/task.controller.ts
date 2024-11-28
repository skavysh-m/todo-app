import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  getAll() {
    return this.taskService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.taskService.getOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.taskService.delete(id);
  }
}
