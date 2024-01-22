import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail-service/mail-service.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, PrismaService, JwtService, MailService]
})
export class AuthModule {}
