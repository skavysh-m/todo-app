import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { KafkaModule } from '../kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
