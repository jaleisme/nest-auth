import { IsInt } from "class-validator";

export class CreateBoardMemberDto {
    @IsInt()
    board_id: number;

    @IsInt()
    user_id: number;
}
