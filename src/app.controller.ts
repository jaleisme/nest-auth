import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';
import { MailService } from './mail-service/mail-service.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly mailService: MailService) {}
  
  @Get()
  @ApiOperation({
    'summary': 'Root route of this app',
    'description': 'Root route of this app, mainly navigating devs to access the API docs'
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
