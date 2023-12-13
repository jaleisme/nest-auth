import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from './guards/refresh.guard';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private userService: UserService, private authService: AuthService){}

    @Post('register')
    @ApiOperation({
        'summary': 'Registering user into the database',
        'description': 'Adding a new user data into the database',
        // 'requestBody': 
    })
    @ApiBody({
        "schema": {
            'type': 'object',
            'properties': {
                'name': {'type': 'string'},
                'email': {'type': 'string'},
                'password': {'type': 'string'},
            }
        }    
    })
    @ApiOkResponse({
        'schema': {
            'example': {
                'id': 1,
                'name': 'John Doe',
                'email': 'Jonathan@testme.com'
            }
        }
    })
    async registerUser(@Body() dto: CreateUserDto){
        return await this.userService.create(dto);
    }

    @Post('login')
    async login(@Body() dto: LoginDto){
        return await this.authService.login(dto);
    }

    @UseGuards(RefreshJwtGuard)
    @Post('refresh')
    async refreshtoken(@Request() req){
        return await this.authService.refreshToken(req.user);
    }
}
