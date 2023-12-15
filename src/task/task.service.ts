import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/task.dto';
import { PrismaService } from 'src/prisma.service';
import { Task } from '@prisma/client';

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

    async getTaskById(_id: number){
        return await this.prisma.task.findFirst({
            where: {id: _id}
        });
    }

    async updateTask(dto: CreateTaskDto, id: number){
        const task = await this.prisma.task.update({
            where: {id: id},
            data: dto,
        });
        return task;
    }

    async deleteTask(_id:number){
        return await this.prisma.task.delete({
            where: {id:_id},
        });
    }
}
