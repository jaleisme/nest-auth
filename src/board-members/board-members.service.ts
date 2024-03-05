import { Injectable } from '@nestjs/common';
import { CreateBoardMemberDto } from './dto/create-board-member.dto';
import { UpdateBoardMemberDto } from './dto/update-board-member.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BoardMembersService {
  constructor(private prisma: PrismaService){}

  async create(createBoardMemberDto: CreateBoardMemberDto) {
    const newBoardMember = this.prisma.board_Member.create({
      data:{
        ...createBoardMemberDto,
      },
    });
    return newBoardMember;
  }

  async findByBoard(boardId: number) {
    return await this.prisma.board_Member.findMany({
      where: {
        board_id: {
          equals: boardId,
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} boardMember`;
  }

  update(id: number, updateBoardMemberDto: UpdateBoardMemberDto) {
    return `This action updates a #${id} boardMember`;
  }

  remove(id: number) {
    return `This action removes a #${id} boardMember`;
  }
}
