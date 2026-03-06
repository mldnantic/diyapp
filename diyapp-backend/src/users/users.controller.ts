import { Body, Controller, Get, Param, ParseIntPipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './models/user.dto';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @UseGuards(LocalAuthGuard)
    @Get(':username')
    public getUser(@Param('username') username: string) {
        return this.usersService.getByUsername(username);
    }

    @UseGuards(LocalAuthGuard)
    @Post('uploadProfilePicture/:id')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads/users',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = extname(file.originalname);
                callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            },
        }),
        limits: {
            fileSize: 1024 * 1024
        }
    }))
    public async uploadProfilePicture(
        @UploadedFile() file: Express.Multer.File,
        @Param('id') username: string
    ) {
        return this.usersService.uploadProfilePicture(username, file.path);
    }

    @Post()
    public registerUser(@Body() dto: UserDto) {
        return this.usersService.register(dto);
    }

}
