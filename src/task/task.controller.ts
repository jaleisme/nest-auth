import { Body, Controller, Get, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/task.dto';

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
}
