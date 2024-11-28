import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { KafkaProducer } from '../kafka/kafka.producer';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
    private readonly kafkaProducer: KafkaProducer,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    await createdTask.save();
    await this.kafkaProducer.emit('task-created', createdTask);
    return createdTask;
  }

  async getAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async getOne(id: string): Promise<Task> {
    return this.taskModel.findById(id);
  }

  async update(id: string, updateTaskDto: CreateTaskDto): Promise<Task> {
    const updatedTask = await this.taskModel.findByIdAndUpdate(
      id,
      updateTaskDto,
      { new: true },
    );
    await this.kafkaProducer.emit('task-updated', updatedTask);
    return updatedTask;
  }

  async delete(id: string): Promise<void> {
    await this.taskModel.findByIdAndDelete(id);
    await this.kafkaProducer.emit('task-deleted', { id });
  }
}
