import { PartialType } from '@nestjs/swagger';
import { CreateBoardMemberDto } from './create-board-member.dto';
import { IsInt } from 'class-validator';

export class UpdateBoardMemberDto extends PartialType(CreateBoardMemberDto) {
    @IsInt()
    board_id: number;

    @IsInt()
    user_id: number;
}
