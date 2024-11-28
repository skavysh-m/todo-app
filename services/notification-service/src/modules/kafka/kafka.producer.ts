import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KafkaProducer implements OnModuleInit, OnModuleDestroy {
  private producer: Producer;
  private kafka: Kafka;
  private readonly logger = new Logger(KafkaProducer.name);

  constructor(private readonly configService: ConfigService) {
    // Retrieve broker and client ID from config
    const brokers = [
      this.configService.get<string>('KAFKA_BROKER') || 'localhost:9092',
    ];
    const clientId =
      this.configService.get<string>('CLIENT_ID') || 'default-client';

    // Configure the Kafka instance with client ID
    this.kafka = new Kafka({
      clientId, // Set client ID here
      brokers,
    });

    this.producer = this.kafka.producer();
  }

  async onModuleInit() {
    await this.connectProducer();
  }

  private async connectProducer() {
    try {
      await this.producer.connect();
      this.logger.log('Kafka producer connected');
    } catch (error) {
      this.logger.error('Error connecting Kafka producer', error);
    }
  }

  async emit(topic: string, message: any) {
    try {
      await this.producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }],
      });
      this.logger.log(`Message sent to topic ${topic}`);
    } catch (error) {
      this.logger.error('Error sending message to Kafka', error);
    }
  }

  async onModuleDestroy() {
    try {
      await this.producer.disconnect();
      this.logger.log('Kafka producer disconnected');
    } catch (error) {
      this.logger.error('Error disconnecting Kafka producer', error);
    }
  }
}
