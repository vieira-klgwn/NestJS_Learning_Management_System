import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':id')
    async getUserById(@Param('id') id: string) {
        return this.userService.user({ id: Number(id) });
    }

    @Get()
    async getUsers() {
        return this.userService.users({});
    }

    @Post()
    async createUser(@Body() userData: { name: string; username: string; password: string }) {
        return this.userService.createUser(userData);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser({ id: Number(id) });
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() userData: { name?: string; username?: string; password?: string }) {
        return this.userService.updateUser({
            where: { id: Number(id) },
            data: userData,
        });
    }
}
