import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './models/user.dto';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @UseGuards(LocalAuthGuard)
    @Get(":username")
    public getUser(@Param("username") username: string) {
        return this.usersService.getByUsername(username);
    }

    @Post()
    public registerUser(@Body() dto: UserDto) {
        return this.usersService.register(dto);
    }

}
