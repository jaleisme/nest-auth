import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/task.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService){}

    @Post('create')
    async createTask(@Body() dto: CreateTaskDto){
        return await this.taskService.create(dto);
    }

    @Get()
    async getAllTask(){
        const tasks = await this.taskService.getAllTask();
        return tasks;
    }

    @Get(':id')
    async getTaskById(@Param() params){
        const id: number = +params.id;
        return await this.taskService.getTaskById(id);
    }

    @Put(':id')
    async updateTask(@Param() params, @Body() req){      
        const id: number = +params.id;  
        return this.taskService.updateTask(req, id);
    }

    @Delete(':id')
    async deleteTask(@Param() params){
        const id: number = +params.id;
        const task = this.taskService.getTaskById(id);
        if(task){
            this.taskService.deleteTask(id);
            return HttpStatus.OK;
        }
        throw new NotFoundException();
    }
}
