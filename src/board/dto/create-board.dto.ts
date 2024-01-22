import { IsInt, IsString } from "class-validator";

export class CreateBoardDto {
    @IsString()
    name: string;

    @IsInt()
    created_by: number;
}
