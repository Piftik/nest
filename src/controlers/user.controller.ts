import {Get, Controller, Post, Body, Query, Delete, Patch, Param, UseGuards, Req} from '@nestjs/common'
import {UserService} from "../services/user.service";
import {RegisterUserDto} from "../commons/dto/user/register-user.dto";
import {UpdateUserDto} from "../commons/dto/user/update-user.dto";
import {AuthGuard} from "../lib";
import {JwtPayload} from "./models/jwt.payload";

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {
    }

    @Post('/register')
    async add (@Body() body: RegisterUserDto) {
        await this.userService.register(body);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async delete (@Param('id') id: number) {
        return this.userService.delete(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('/patch')
    async patch(@Body() body: UpdateUserDto ) {
        return this.userService.patch(body);
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@Req() req: any, @Body() body: Record<string, string>) {
        return this.userService.getToken({
            username: body.username,
            id: req.user.id
        });
    }
}
