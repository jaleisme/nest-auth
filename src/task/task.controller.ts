import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/task.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ApiBody, ApiHeader, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Task Management')
@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService){}

    @Post('create')
    @UseGuards(JwtGuard)
    @ApiOperation({
        'summary': 'Create a new task data',
        'description': 'Create and save a new task data into the database',
        // 'requestBody': 
    })
    @ApiHeader({
        'name': 'Authorization',
        'required': true,
        'description': 'Bearer token for authorization'
    })
    @ApiBody({
        "schema": {
            'type': 'object',
            'properties': {
                'title': {'type': 'string'},
                'description': {'type': 'string'},
                'due_date': {'type': 'date', example: '2023-12-13T06:48:49.444Z'},
            }
        } 
    })
    @ApiOkResponse({
        status: 200,
        description: 'Successfully create and save the task data',
        schema:{
            example:{
                "id": 7,
                "title": "Test Dev Local",
                "description": "Testing local development environment",
                "due_date": "2023-12-13T06:48:49.444Z"
            }
        }
    })
    async createTask(@Body() dto: CreateTaskDto){
        return await this.taskService.create(dto);
    }



    @Get()
    @UseGuards(JwtGuard)
    @ApiOperation({
        'summary': 'Retrieve all task data',
        'description': 'Retrieve and return all task data from the database',
        // 'requestBody': 
    })
    @ApiHeader({
        'name': 'Authorization',
        'required': true,
        'description': 'Bearer token for authorization'
    })
    @ApiOkResponse({
        status: 200,
        description: 'Successfully retrieve all task data',
        schema:{
            example:{
                "tasks":
                [
                    {
                        "id": 1,
                        "title": "Test Dev Local Update",
                        "description": "Testing local development environment",
                        "due_date": "2023-12-13T06:48:49.444Z"
                    },
                    {
                        "id": 2,
                        "title": "Test 1",
                        "description": "Test desc",
                        "due_date": "2023-12-13T06:48:49.444Z"
                    }
                ]
            }
        }
    })    
    async getAllTask(){
        const tasks = await this.taskService.getAllTask();
        return tasks;
    }



    @Get(':id')
    @UseGuards(JwtGuard)
    @ApiOperation({
        'summary': 'Get a specific task data',
        'description': 'Get a specific task data from the database',
        // 'requestBody': 
    })
    @ApiHeader({
        
            'name': 'Authorization',
            'required': true,
            'description': 'Bearer token for authorization'
        
    })
    @ApiOkResponse({
        status: 200,
        description: 'Successfully fetch and return the task data from the database',
        schema:{
            example:{
                "id": 7,
                "title": "Test Dev Local",
                "description": "Testing local development environment",
                "due_date": "2023-12-13T06:48:49.444Z"
            }
        }
    })
    async getTaskById(@Param() params){
        const id: number = +params.id;
        return await this.taskService.getTaskById(id);
    }

    @Put(':id')
    @UseGuards(JwtGuard)
    @ApiOperation({
        'summary': 'Edit a specific task data',
        'description': 'Edit and update a specific task data from the database',
        // 'requestBody': 
    })
    @ApiHeader({
        
            'name': 'Authorization',
            'required': true,
            'description': 'Bearer token for authorization'
        
    })
    @ApiOkResponse({
        status: 200,
        description: 'Successfully edit and update the task data in the database',
        schema:{
            example:{
                "id": 7,
                "title": "Test Dev Local",
                "description": "Testing local development environment",
                "due_date": "2023-12-13T06:48:49.444Z"
            }
        }
    })
    @ApiBody({
        "schema": {
            'type': 'object',
            'properties': {
                'title': {'type': 'string'},
                'description': {'type': 'string'},
                'due_date': {'type': 'date', example: '2023-12-13T06:48:49.444Z'},
            }
        } 
    })
    async updateTask(@Param() params, @Body() req){      
        const id: number = +params.id;  
        return this.taskService.updateTask(req, id);
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    @ApiOperation({
        'summary': 'Delete a task data',
        'description': 'Delete a specific task data from the database',
        // 'requestBody': 
    })
    @ApiHeader({
        
            'name': 'Authorization',
            'required': true,
            'description': 'Bearer token for authorization'
        
    })
    @ApiOkResponse({
        status: 200,
        description: 'Successfully delete the task data in the database',
    })    
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
