import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';


//Backend System of our application!
@Injectable()
export class AuthService {

    constructor(private userService: UserService, private jwtService: JwtService){}


    async validateUser(username: string, password: string): Promise<any> {

        try {

            console.log('VALIDATING USER');

            console.log('USERNAME:', username);


            const user = await this.userService.user( {username: username} );

            console.log('FOUND USER:', user);


            if (!user) {
                console.log('NO USER FOUND');
                return null;
            }

            const isMatch = await bcrypt.compare(password, user.password);

            console.log('PASSWORD MATCH:', isMatch);

            if (user && isMatch) {
                return user;
            }
            return null;
        } catch (error) {
            
            console.error('VALIDATE USER ERROR:', error);
            throw error;
        }
    }
    
    async login(user: any) {
        try {
            console.log('LOGIN USER:', user);

            const payload = { username: user.username, sub: user.id };
            return {
            token: this.jwtService.sign(payload),
            user: {
                username: user.username,
                role: user.role,
                userId: user.id
            }
        };
        } catch (error) {
            console.error('LOGIN ERROR:', error);
            throw error;
            
        }
    }

    async register(data: any

    ) {
        try{
            
                    
            console.log('REGISTER DATA:', data);
            const user = await this.userService.createUser(data);
            console.log('CREATED USER:', user);
            const payload = { username: user.username, role: user.role, sub: user.id };
            return {
                token: this.jwtService.sign(payload),
                user: {
                    username: user.username,
                    role: user.role,
                    userId: user.id
                    }
            }

    }catch(error){
        console.error('REGISTER ERROR:', error);
        throw error;

    }

}

}
