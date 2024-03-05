import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { TaskModule } from './task/task.module';
import { ListModule } from './list/list.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail-service/mail-service.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { BoardModule } from './board/board.module';
import { BoardMembersModule } from './board-members/board-members.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, TaskModule, ListModule, MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_SMTP,
        port: process.env.MAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
      template: {
        dir: join(process.cwd(), '/views'),
        adapter: new HandlebarsAdapter({}),
        options: {
          strict: true,
        },
      },
      defaults: {
        from: '"No Reply" <no-reply@example.com>',
      },
    }), BoardModule, BoardMembersModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, MailService],
})
export class AppModule {}
