import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { BoardMembersService } from './board-members.service';
import { CreateBoardMemberDto } from './dto/create-board-member.dto';
import { ApiBody, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('Board Members (Collab)')
@Controller('board-members')
export class BoardMembersController {
  constructor(private readonly boardMembersService: BoardMembersService) {}

  @Post('add-member')
  @ApiHeader({
    'name': 'Authorization',
    'required': true,
    'description': 'Bearer token for authorization'

  })
  @ApiOperation({
    'summary': 'Add new member to a card',
    'description': 'Add new member(user) to a card so the newly added member can access the board'
  })
  @ApiBody({
    "schema": {
        'type': 'object',
        'properties': {
            'board_id': {'type': 'number'},
            'user_id': {'type': 'number'}
        }
    } 
  })
  @UseGuards(JwtGuard)
  create(@Body() createBoardMemberDto: CreateBoardMemberDto) {
    return this.boardMembersService.create(createBoardMemberDto);
  }

  @Post('get-members')
  @ApiHeader({
    'name': 'Authorization',
    'required': true,
    'description': 'Bearer token for authorization'

  })
  @ApiOperation({
    'summary': 'Get Card`s Member',
    'description': 'Fetch all member data that has an access to the card as a collaborator'
  })
  @ApiBody({
    "schema": {
        'type': 'object',
        'properties': {
            'board_id': {'type': 'number'}
        }
    } 
  })
  @UseGuards(JwtGuard)
  findAll(@Body() request: any) {
    return this.boardMembersService.findByBoard(request.board_id);
  }

  @Post('remove-member')
  @ApiHeader({
    'name': 'Authorization',
    'required': true,
    'description': 'Bearer token for authorization'

  })
  @ApiOperation({
    'summary': 'Remove Member from Card',
    'description': 'Remove a certain member from a certain card (revoking member`s access to the card)'
  })
  @ApiBody({
    "schema": {
        'type': 'object',
        'properties': {
            'board_id': {'type': 'number'},
            'user_id': {'type': 'number'},
        }
    } 
  })
  remove(@Body() req: any) {
    return this.boardMembersService.remove(req);
  }
}
