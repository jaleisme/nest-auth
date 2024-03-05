import { Module } from '@nestjs/common';
import { BoardMembersService } from './board-members.service';
import { BoardMembersController } from './board-members.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BoardMembersController],
  providers: [BoardMembersService, PrismaService],
})
export class BoardMembersModule {}
