import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@workspace/database';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

interface JwtPayload {
  sub: string;
  email: string;
  role?: string[];
}

interface Login {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByEmail(username);
    if (!user || !user.isActive) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    const { password: _, ...result } = user;
    return result;
  }

  async login(logUser: Login) {
    const user = await this.userService.findByEmail(logUser.email);
    if (user && user.id) {
      const roles = user.userRoles?.map((ur) => ur.role.name) || [];
      const payload = {
        username: user.name,
        sub: user.id,
        roles: roles,
      };
      const token = this.jwtService.sign(payload);
      return {
        access_token: token,
        user: {
          id: user.id,
          email: user.email,
          roles: roles,
          isVerified: user.isVerified,
        },
      };
    }
    return null;
  }

  async register(userRegister: any) {
    const userCreated = await this.userService.createWithDefaultRole({
      ...userRegister,
      roleName: 'user',
    });
    if (userCreated) {
      const rolesMapped = userCreated.userRoles.map((ur) => ur.role.name) | [];

      const payload = {
        username: userCreated.name,
        sub: userCreated.id,
        roles: rolesMapped,
      };
      return {
        access_token: this.jwtService.sign(payload),
        user: {
          id: userCreated.id,
          email: userCreated.email,
          roles: rolesMapped,
          isVerified: userCreated.isVerified,
        },
      };
    }
    return null;
  }

  async refreshToken(userId: string) {
    const user: User = await this.userService.findById(userId);
    if (user) {
      return this.login({
        email: user.email,
        password: user.password || '',
      });
    }
    return null;
  }
}
