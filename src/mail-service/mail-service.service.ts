import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to My App',
      template: './welcome', // Path to your email template
      context: {
        name,
      },
    });
  }

  async sendResetPasswordEmail(email: string, name: string, reset_token: string): Promise<void>{
    await this.mailerService.sendMail({
      to: email,
      subject: 'Taskify Account Reset Password',
      template: './reset-password',
      context: {
        name,
        reset_token,
      },
    });
  }
}
