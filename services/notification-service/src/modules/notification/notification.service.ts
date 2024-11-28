import { Injectable } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';
import { SendSmsDto } from './dto/send-sms.dto';
import { KafkaProducer } from '../kafka/kafka.producer';

@Injectable()
export class NotificationService {
  constructor(private readonly kafkaProducer: KafkaProducer) {}

  async sendEmail(sendEmailDto: SendEmailDto) {
    // Send email logic here
    return sendEmailDto;
  }

  async sendSms(sendSmsDto: SendSmsDto) {
    // Send SMS logic here
    return sendSmsDto;
  }
}
