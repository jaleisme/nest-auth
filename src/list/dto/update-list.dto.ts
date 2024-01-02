import { PartialType } from '@nestjs/swagger';
import { CreateListDto } from './create-list.dto';
import { IsInt, IsString } from 'class-validator';

export class UpdateListDto extends PartialType(CreateListDto) {
    @IsString()
    name: string;

    @IsInt()
    position: number;

    @IsInt()
    board_id: number;
}
