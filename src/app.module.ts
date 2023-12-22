import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { TaskModule } from './task/task.module';
import { ListModule } from './list/list.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, TaskModule, ListModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
