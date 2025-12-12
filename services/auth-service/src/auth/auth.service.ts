import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  signIn(username: string, pass: string): any {
    const user = this.usersService.findOne(username);
    if (user?.password === pass) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user?.userId, username: user?.username };
    return {
      access_token: this.jwtService.signAsync(payload),
    };
  }
}
