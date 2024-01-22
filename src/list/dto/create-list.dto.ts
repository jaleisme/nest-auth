import { IsInt, IsString } from "class-validator";

export class CreateListDto {
    @IsString()
    name: string;

    @IsInt()
    position: number;

    @IsInt()
    board_id: number;
}
