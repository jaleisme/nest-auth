import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBoardMemberDto } from './dto/create-board-member.dto';
import { UpdateBoardMemberDto } from './dto/update-board-member.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BoardMembersService {
  constructor(private prisma: PrismaService){}

  async create(createBoardMemberDto: CreateBoardMemberDto) {
    const duplicationCheck = await this.prisma.board_Member.findMany({
      where: {
        board_id: createBoardMemberDto.board_id,
        user_id: createBoardMemberDto.user_id,
      },
    });
    console.log(duplicationCheck.length);
    if(duplicationCheck.length == 0){
      const newMember = this.prisma.board_Member.create({
        data:{
          ...createBoardMemberDto,
        },
      });
      return newMember;
    }
    throw new BadRequestException();
  }

  async findByBoard(boardId: number) {
    const fetchMember = await this.prisma.board_Member.findMany({
      select: {
        user: {
          select: {
            id: true,
            name: true,
          }
        }
      },
      where: {
        board_id: {
          equals: boardId,
        },
      },
    });
    return fetchMember;
    
  }

  async remove(req) {
    return await this.prisma.board_Member.deleteMany({
      where: {
        AND:[
          {
            board_id: {
              equals: +req.board_id
            }
          },
          {
            user_id: {
              equals: +req.user_id
            }
          },
        ],
      },
    });
  }
}
