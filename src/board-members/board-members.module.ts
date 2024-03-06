import { Module } from '@nestjs/common';
import { BoardMembersService } from './board-members.service';
import { BoardMembersController } from './board-members.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [BoardMembersController],
  providers: [BoardMembersService, PrismaService, JwtService],
})
export class BoardMembersModule {}
