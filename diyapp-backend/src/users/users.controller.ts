import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './models/user.dto';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Get(":username")
    public getUser(@Param("username") username: string) {
        return this.usersService.getByUsername(username);
    }

    @Post()
    public registerUser(@Body() dto: UserDto) {
        return this.usersService.register(dto);
    }

}
