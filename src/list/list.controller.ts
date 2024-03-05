import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { ApiBody, ApiHeader, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiOperation({
    'summary': 'Create new list data',
    'description': 'Create and save a new task data into the database',
    // 'requestBody': 
  })
  @ApiBody({
    "schema": {
        'type': 'object',
        'properties': {
            'title': {'type': 'string'},
        }
    } 
  })
  // @ApiHeader({
  //   'name': 'Authorization',
  //   'required': true,
  //   'description': 'Bearer token for authorization'
  // })
  @ApiOkResponse({
    status: 200,
    description: 'Successfully create new list data',
    schema:{
        example:{ 
          "response":[
            {
              "id": 3,
              "title": "test"
            }
          ]
        }
    }
  })   
  create(@Body() createListDto: CreateListDto) {
    return this.listService.create(createListDto);
  }

  @Get()
  @UseGuards(JwtGuard)
  @ApiOperation({
    'summary': 'Retrieve all lists data',
    'description': 'Retrieve and return all lists data from the database',
    // 'requestBody': 
  })
  // @ApiHeader({
  //   'name': 'Authorization',
  //   'required': true,
  //   'description': 'Bearer token for authorization'
  // })
  @ApiOkResponse({
    status: 200,
    description: 'Successfully retrieve all list data',
    schema:{
        example:{
            "lists":
            [
              {
                  "id": 2,
                  "title": "test"
              }
          ]
        }
    }
  }) 
  findAll() {
    return this.listService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  @ApiOperation({
    'summary': 'Get a specific list data',
    'description': 'Get a specific list data from the database',
    // 'requestBody': 
  })
  // @ApiHeader({
      
  //         'name': 'Authorization',
  //         'required': true,
  //         'description': 'Bearer token for authorization'
      
  // })
  @ApiOkResponse({
      status: 200,
      description: 'Successfully fetch and return the list data from the database',
      schema:{
          example:{
              "id": 7,
              "title": "Test"
          }
      }
  })
  findOne(@Param('id') id: string) {
    return this.listService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @ApiOperation({
    'summary': 'Edit a specific list data',
    'description': 'Edit and update a specific list data from the database',
  })
  // @ApiHeader({
  //   'name': 'Authorization',
  //   'required': true,
  //   'description': 'Bearer token for authorization'
      
  // })
  @ApiBody({
    "schema": {
        'type': 'object',
        'properties': {
            'title': {'type': 'string'},
        }
    } 
  })  
  @ApiOkResponse({
    status: 200,
    description: 'Successfully edit and update the list data in the database',
    schema:{
      example:{
        "id": 7,
        "title": "Test"
      }
    }
  })
  update(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    return this.listService.update(+id, updateListDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @ApiOperation({
    'summary': 'Delete a list data',
    'description': 'Delete a specific list data from the database',
    // 'requestBody': 
  })
  @ApiHeader({
    'name': 'Authorization',
    'required': true,
    'description': 'Bearer token for authorization'
  })
  @ApiOkResponse({
    status: 200,
    description: 'Successfully delete the list data in the database',
  })      
  remove(@Param('id') id: string) {
    return this.listService.remove(+id);
  }
}
