import { IsDateString, IsString } from "class-validator";

export class CreateTaskDto{
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsDateString()
    due_date: Date;
}