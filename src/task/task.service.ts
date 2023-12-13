import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/task.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService){}
    
    async create(dto:CreateTaskDto){
        const newTask = await this.prisma.task.create({
            data: {
                ...dto,
            },
        });
        return newTask;
    }

    async getAllTask(){
        return await this.prisma.task.findMany();
    }
}
