import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}

    async updatePassword(email: string, new_password: string){
        const user = await this.prisma.user.update({
            where: {email:email},
            data: {
                reset_token: null,
                password: await hash(new_password, 10),
            }
        });
        return "Password updated successfully!";
    }

    async verifyAccount(email:string){
        const user = await this.prisma.user.update({
            where: {email:email},
            data:{
                verification_token: null,
                is_verified: true
            }
        });
        return "Account verified successfully!";
    }

    async create(dto: CreateUserDto){
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            }
        });
        if (user) throw new ConflictException("Email duplication found!");
        const newUser = await this.prisma.user.create({
            data: {
                ...dto,
                password: await hash(dto.password, 10),
            },
        });
        const { password, ...result } = newUser;
        return result;
    }

    async findByEmail(email:string){
        return await this.prisma.user.findUnique({
            where: {
                email: email,
            },
        });
    }

    async findById(id:number){
        return await this.prisma.user.findUnique({
            where: {
                id: id,
            },
        });
    }

    async findByResetToken(token:string){
        return await this.prisma.user.findFirst({
            where: {
                reset_token: token,
            },
        });
    }
}
