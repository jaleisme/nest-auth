import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeEmail(email: string = 'jaleisme.id@gmail.com', name: string = 'Faizal', url: string = process.env.FRONTEND_URL, verificationToken: string = 'RUGIDONG'): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to Taskify',
      template: './welcome', // Path to your email template
      context: {
        name,
        url,
        verificationToken,
        email,
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
