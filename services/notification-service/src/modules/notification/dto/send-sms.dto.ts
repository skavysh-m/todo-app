import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class SendSmsDto {
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty()
  message: string;
}
