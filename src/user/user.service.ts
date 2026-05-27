import { forwardRef, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {Prisma, User} from '../generated/prisma/client';
import bcrypt from 'bcrypt';



@Injectable()
export class UserService {

    constructor(
        private readonly prisma: PrismaService) {}

    async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput,):Promise<User | null> {
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput
        });
    }

    async users(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }):Promise<User[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy
        });       
    }

    async createUser(data: Prisma.UserCreateInput) {

        try {
            console.log('CREATING USER');
      
            console.log('INPUT DATA:', data);
      
              const hashedPassword = await bcrypt.hash(data.password, 10);
      
              console.log('PASSWORD HASHED');
              
              const user = await this.prisma.user.create({
                  data: {
                      username: data.username,
                      password: hashedPassword,
                      role: data.role,
                  }
              });
      
              console.log('USER CREATED:', user);
      
              return user
            
        } catch (error) {

            console.error('CREATE USER ERROR:', error);

            throw error;
            
        }

    }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }):Promise<User> {
        const { where, data } = params;
        return this.prisma.user.update({
            where,
            data
        });
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput):Promise<User> {
        return this.prisma.user.delete({
            where
        });
    }
}
