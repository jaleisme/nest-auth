import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ListService {
  constructor(private prisma: PrismaService) {}

  async create(createListDto: CreateListDto) {
    const newList = await this.prisma.list.create({
      data: {
        ...createListDto,
      },
    });
    return newList;
  }

  async findAll() {
    return await this.prisma.list.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.list.findFirst({
      where:{id: id},
    });
  }

  async update(id: number, updateListDto: UpdateListDto) {
    const list = await this.prisma.list.update({
      where:{id:id},
      data:{...updateListDto},
    });
    return list;
  }

  async remove(id: number) {
    return await this.prisma.list.delete({
      where:{id:id},
    });
  }
}
