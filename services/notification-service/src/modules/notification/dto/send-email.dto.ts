import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendEmailDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  body: string;
}
