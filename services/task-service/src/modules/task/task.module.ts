import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Task, TaskSchema } from './task.entity';
import { KafkaProducer } from '../kafka/kafka.producer';
import { KafkaModule } from '../kafka/kafka.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    KafkaModule,
  ],
  controllers: [TaskController],
  providers: [TaskService, KafkaProducer],
})
export class TaskModule {}
