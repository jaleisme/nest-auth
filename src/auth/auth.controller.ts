import { Body, Controller, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from './guards/refresh.guard';
import { ApiBody, ApiHeader, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { ResetGuard } from './guards/reset.guard';
import { MailService } from 'src/mail-service/mail-service.service';

@Controller('auth')
export class AuthController {
    constructor(private userService: UserService, private authService: AuthService, private mailService: MailService){}

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
                'name': {'type': 'string', format: 'name'},
                'email': {'type': 'string', format: 'email'},
                'password': {'type': 'string', format: 'password'},
            }
        }    
    })
    @ApiOkResponse({
        status: 200,
        description: 'Successfully registering user'
    })
    async registerUser(@Body() dto: CreateUserDto){
        const register = await this.userService.create(dto);
        if(register) return HttpStatus.OK;
    }

    @Post('login')
    @ApiOperation({
        'summary': 'Logging into the system',
        'description': 'Logging into the system to access modules that can be only accessed after logging in.',
        // 'requestBody':  
    })
    @ApiBody({
        "schema": {
            'type': 'object',
            'properties': {
                'username': {'type': 'string', format: 'email'},
                'password': {'type': 'string', format: 'password'},
            }
        }    
    })
    @ApiOkResponse({
        status: 200,
        description: 'Successfully logging in to the system.',
        schema:{
            example:{
                "user": {
                    "id": 0,
                    "email": "Test@test.com",
                    "name": "John Doe"
                },
                "backendTokens": {
                    "accessToken": "<USER ACCESS TOKEN>",
                    "refreshToken": "<USER REFRESH TOKEN>"
                }
            }
        }
    })    
    async login(@Body() dto: LoginDto){
        return await this.authService.login(dto);
    }

    @Post('refresh')
    @UseGuards(RefreshJwtGuard)
    @ApiOperation({
        'summary': 'Refresh both access and refresh token for a user.',
        'description': 'Refresh both access and refresh token for a user, enabling them to get a longer time to access the system.',
    })
    @ApiHeader({
        name: 'Authorization',
        required: true,
        description: 'Refresh token for authorization'
    })
    @ApiOkResponse({
        status: 200,
        description: 'Return both access and refresh token for the user.',
        schema:{
            example:{
                "accessToken": "<USER ACCESS TOKEN>",
                "refreshToken": "<USER REFRESH TOKEN>"
            }
        }
    })
    async refreshtoken(@Request() req){
        return await this.authService.refreshToken(req.user);
    }

    @Post('generate-reset-password-token')
    async generateResetToken(@Request() req){
        const userData = this.userService.findByEmail(req.body.user);
        const resetToken = await this.authService.generateResetPasswordToken(req.body.user);
        const emailAddress = (await userData).email;
        const name = (await userData).name;
        
        await this.mailService.sendResetPasswordEmail(emailAddress, name, resetToken);
        return 'Email sent!';
    }
    
    @Post('reset-password')
    @UseGuards(ResetGuard)
    async resetPassword(@Request() req){
        return await this.userService.updatePassword(req.user.username, req.body.new_password);

    }
}
