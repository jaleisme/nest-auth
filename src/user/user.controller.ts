import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ApiBody, ApiHeader, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    @UseGuards(JwtGuard)
    @ApiOperation({
        'summary': 'Get all user data from the database',
        'description': 'Retrieve and return all user data from the database.',
    })
    @ApiHeader({
        name: 'Authorization',
        required: true,
        description: 'Bearer token for authorization'
    })
    @ApiOkResponse({
        status: 200,
        description: 'Return user data which schema is being shown below.',
        schema: {
            'type': 'object',
            'properties': {
                'id': {'type': 'number'},
                'name': {'type': 'string', format: 'name'},
            }
        }
    })
    async getUserProfile() {
        return await this.userService.findAll();
    }
}
