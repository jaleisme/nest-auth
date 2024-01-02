import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService,  private jwtService: JwtService, private prisma: PrismaService){}

    async login(dto: LoginDto){
        const user = await this.validateUser(dto);
        const payload = {
            username: user.email,
            sub: {
                name: user.name,
            }
        }
        return {
            user,
            backendTokens: {
                accessToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '5h',
                    secret: process.env.jwtSecretKey,
                }),
                refreshToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '7d',
                    secret: process.env.jwtRefreshTokenKey,
                }),
            }
        }
    }

    async validateUser(dto:LoginDto){
        const user = await this.userService.findByEmail(dto.username);
        if(user && (await compare(dto.password,user.password))){
            const {password, ...result} = user;
            return result;
        }
        throw new UnauthorizedException();
    }

    async refreshToken(user:any){
        const payload = {
            username: user.username,
            sub: user.sub,
        }
        return {
            accessToken: await this.jwtService.signAsync(payload, {
                expiresIn: '5h',
                secret: process.env.jwtSecretKey,
            }),
            refreshToken: await this.jwtService.signAsync(payload, {
                expiresIn: '7d',
                secret: process.env.jwtRefreshTokenKey,
            }),
        }
    }

    async generateResetPasswordToken(user:any){
        const payload = {
            username: user,
        }
        const resetToken = await this.jwtService.signAsync(payload, {
            expiresIn: '1h',
            secret: process.env.jwtResetTokenKey,
        })
        const userData = await this.prisma.user.update({
            where: {email:user},
            data: {
                reset_token: resetToken,
            }
        });
        if(!userData) {
            throw new NotFoundException();
        }
        return resetToken;
    }
}
