import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';
import { MailService } from './mail-service/mail-service.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly mailService: MailService) {}

  @Get('/send-email')
  async sendEmail(): Promise<string> {
    const email = 'jaleisme.id@gmail.com';
    const name = 'Faizal';

    await this.mailService.sendWelcomeEmail(email, name);
    return 'Email sent successfully';
  }  
  
  @Get()
  @ApiOperation({
    'summary': 'Root route of this app',
    'description': 'Root route of this app, mainly navigating devs to access the API docs',
    // 'requestBody': 
})
  getHello(): string {
    return this.appService.getHello();
  }
}
