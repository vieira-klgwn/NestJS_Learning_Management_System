import { forwardRef, Inject, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';



@Module({
  imports:[ ConfigModule.forRoot({isGlobal: true}),UserModule, PassportModule, JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '600s' },
  })],
  providers: [AuthService, LocalStrategy, UserService, PrismaService, JwtStrategy],
  exports:[AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
