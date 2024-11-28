import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './modules/task/task.module';
import { KafkaModule } from './modules/kafka/kafka.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI ?? 'mongodb://localhost:27017/task-service',
    ),
    TaskModule,
    KafkaModule,
  ],
})
export class AppModule {}
