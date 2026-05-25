import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { BookController } from './book/book.controller';
import { UserController } from './user/user.controller';
import { BookService } from './book/book.service';
import { PrismaService } from './prisma.service';
import { UserService } from './user/user.service';

@Module({
  imports: [AuthModule, UserModule, BookModule],
  controllers: [AppController, BookController, UserController],
  providers: [AppService,BookService, PrismaService,UserService],
})
export class AppModule {}
