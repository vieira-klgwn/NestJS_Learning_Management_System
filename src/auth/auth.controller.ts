import { Body, Controller, Get, Post, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-aut.guard';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() userData: { name: string; username: string; password: string; role: string }) {
        try {
            console.log('REGISTER REQUEST RECEIVED');

            console.log(userData);

            return await this.authService.register(userData);
            
        } catch (error) {
            
            console.error('REGISTER CONTROLLER ERROR:', error);
            throw error;
        }
    }

    @Post('login')
    async login(@Body() loginData: { username: string; password: string }) {

        const user = await this.authService.validateUser(
            loginData.username,
            loginData.password
        );

        if (!user) {
            throw new UnauthorizedException("Invalid credentials");
        }

        return this.authService.login(user);

    }   


    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(@Request() req: any) {
        return req.logout();
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req:any) {
        return {
            user: req.user
        }
  }
}
