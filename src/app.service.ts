import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `<code>Please check out the full API documentation at <a href="/api" style="font-weight: bolder; color: red; background-color: #fceceb; padding: 4px 6px;">/api</a></code>`;
  }
}
