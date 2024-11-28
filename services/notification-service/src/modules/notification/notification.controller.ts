import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { SendEmailDto } from './dto/send-email.dto';
import { SendSmsDto } from './dto/send-sms.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('send-email')
  async sendEmail(@Body() sendEmailDto: SendEmailDto) {
    return this.notificationService.sendEmail(sendEmailDto);
  }

  @Post('send-sms')
  async sendSms(@Body() sendSmsDto: SendSmsDto) {
    return this.notificationService.sendSms(sendSmsDto);
  }
}
