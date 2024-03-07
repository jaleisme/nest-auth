import { PartialType } from '@nestjs/swagger';
import { CreateBoardDto } from './create-board.dto';
import { IsInt, IsString } from 'class-validator';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
    @IsString()
    name: string;
}
