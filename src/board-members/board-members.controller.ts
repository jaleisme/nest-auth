import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BoardMembersService } from './board-members.service';
import { CreateBoardMemberDto } from './dto/create-board-member.dto';
import { UpdateBoardMemberDto } from './dto/update-board-member.dto';

@Controller('board-members')
export class BoardMembersController {
  constructor(private readonly boardMembersService: BoardMembersService) {}

  @Post()
  create(@Body() createBoardMemberDto: CreateBoardMemberDto) {
    return this.boardMembersService.create(createBoardMemberDto);
  }

  @Post('find-by-board')
  findAll(@Body() request: any) {
    return this.boardMembersService.findByBoard(request.board_id);
    // return this.boardMembersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardMembersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoardMemberDto: UpdateBoardMemberDto) {
    return this.boardMembersService.update(+id, updateBoardMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardMembersService.remove(+id);
  }
}
