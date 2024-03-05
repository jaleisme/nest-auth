import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ApiBody, ApiHeader } from '@nestjs/swagger';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post('/create')
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
  @UseGuards(JwtGuard)
  findOne(@Param('id') id: number) {
    return this.boardService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  update(@Param('id') id: number, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(id, updateBoardDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  remove(@Param('id') id: number) {
    return this.boardService.remove(+id);
  }
}
