/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ApiBody, ApiHeader, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Board Management')
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post('/create')
  @ApiHeader({
    'name': 'Authorization',
    'required': true,
    'description': 'Bearer token for authorization'
  })
  @ApiOperation({
    'summary': 'Create new board data',
    'description': 'Create and save a new board data into the database',
    // 'requestBody': 
  })
  @ApiBody({
    "schema": {
        'type': 'object',
        'properties': {
            'name': {'type': 'string'},
            'created_by': {'type': 'number'}
        }
    } 
  })
  @UseGuards(JwtGuard)
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.create(createBoardDto);
  }

  @UseGuards(JwtGuard)
  @ApiHeader({
    'name': 'Authorization',
    'required': true,
    'description': 'Bearer token for authorization'

  })
  @ApiOperation({
    'summary': 'Get user`s board',
    'description': 'Fetch all user`s board data, both owned and collaborating in',
    // 'requestBody': 
  })
  @ApiBody({
    "schema": {
        'type': 'object',
        'properties': {
            'userId': {'type': 'number'}
        }
    } 
  })
  @Post() 
  findAll(@Body() request: any) {
    return this.boardService.findAll(request.userId);
  }

  @Get(':id')
  @ApiHeader({
    'name': 'Authorization',
    'required': true,
    'description': 'Bearer token for authorization'

  })
  @ApiOperation({
    'summary': 'Get board detail',
    'description': 'Fetch specific board data',
    // 'requestBody': 
  })
  @UseGuards(JwtGuard)
  findOne(@Param('id') id: number) {
    return this.boardService.findOne(+id);
  }

  @Patch(':id')
  @ApiHeader({
    'name': 'Authorization',
    'required': true,
    'description': 'Bearer token for authorization'
  })
  @ApiOperation({
    'summary': 'Update board data',
    'description': 'Update and save certain board data in the database',
    // 'requestBody': 
  })
  @ApiBody({
    "schema": {
        'type': 'object',
        'properties': {
            'name': {'type': 'string'}
        }
    } 
  })
  @UseGuards(JwtGuard)
  update(@Param('id') id: number, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(id, updateBoardDto);
  }

  @Delete(':id')
  @ApiHeader({
    'name': 'Authorization',
    'required': true,
    'description': 'Bearer token for authorization'
  })
  @ApiOperation({
    'summary': 'Delete board data',
    'description': 'Delete board data from the database',
    // 'requestBody': 
  })
  @UseGuards(JwtGuard)
  remove(@Param('id') id: number) {
    return this.boardService.remove(+id);
  }
}
