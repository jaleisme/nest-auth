/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BoardService {
  constructor(private prisma: PrismaService) {}

  async create(createBoardDto: CreateBoardDto) {
    const newBoard = this.prisma.board.create({
      data: {
        ...createBoardDto,
      },
    });
    return newBoard;
  }

  async findAll(userId: number) {
    let ownedBoards = await this.prisma.board.findMany({
      where: {
        created_by: {
          equals: userId,
        },
      },
    });
    let memberBoards = await this.prisma.board_Member.findMany({
      select:{
        board: {
          select: {
            id: true,
            name: true,
            created_by: true
          }
        }
      },
      where:{
        user_id: {
          equals: userId
        }
      }
    })
    memberBoards.map((data) => {
      ownedBoards.push(data.board);
    });
    return ownedBoards;
  }

  async findOne(id: number) {
    return await this.prisma.board.findUnique({
      where: { id: id },
      include: {
        lists: {
          include: {
            tasks: true,
          },
        },
      },
    });
  }

  async update(id: number, updateBoardDto: UpdateBoardDto) {
    return await this.prisma.board.update({
      where: { id: +id },
      data: { ...updateBoardDto },
    });
  }

  async remove(id: number) {
    return await this.prisma.board.delete({
      where: { id: id },
    });
  }
}
