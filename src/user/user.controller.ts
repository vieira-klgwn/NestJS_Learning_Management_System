import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('user/:id')
    async getUserById(id: string) {
        return this.userService.user({ id: Number(id) });
    }

    @Get('users')
    async getUsers() {
        return this.userService.users({});
    }

    @Post('user')
    async createUser(@Body() userData: { name: string; email: string; password: string }) {
        return this.userService.createUser(userData);
    }

    @Delete('user/:id')
    async deleteUser(id: string) {
        return this.userService.deleteUser({ id: Number(id) });
    }

    @Put('user/:id')
    async updateUser(id: string, @Body() userData: { name?: string; email?: string; password?: string }) {
        return this.userService.updateUser({
            where: { id: Number(id) },
            data: userData,
        });
    }
}
