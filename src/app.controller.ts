import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-aut.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) {}



  @Get()
  getHello(): string {
    return this.appService.getHello();
  }




}
