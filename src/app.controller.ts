import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
