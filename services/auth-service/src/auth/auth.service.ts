import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    console.log('AuthService signIn called with:', { username, pass });
    const user = await this.usersService.findOne(username);
    console.log('User found:', user);
    if (user?.password !== pass) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user?.userId, username: user?.username };
    const token = await this.jwtService.signAsync(payload);
    console.log('JWT Payload:', payload);
    return {
      access_token: token,
    };
  }
}
