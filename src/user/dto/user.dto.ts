import { IsEmail, IsOptional, IsString } from "class-validator";

export class CreateUserDto{
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    @IsOptional()
    verification_token: string;
}