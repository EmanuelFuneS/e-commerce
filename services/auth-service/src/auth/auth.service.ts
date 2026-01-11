import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRegister } from '../users/types';
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
    if (user && user.isActive && user.password) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return null;
      }
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async login(logUser: Login) {
    const userFound = await this.userService.findByEmail(logUser.email);

    if (userFound && userFound.password) {
      const isPasswordValid = await bcrypt.compare(
        logUser.password,
        userFound.password,
      );
      if (isPasswordValid) {
        const payload = {
          username: userFound.name,
          sub: userFound.id,
          roles: userFound.roles,
        };
        const token = this.jwtService.sign(payload);
        return {
          access_token: token,
          user: {
            id: userFound.id,
            email: userFound.email,
            roles: userFound.roles,
            isVerified: userFound.isVerified,
          },
        };
      } else {
        throw new ConflictException(`Password Failed`);
      }
    }
  }

  async register(userRegister: any) {
    const userCreated = await this.userService.createWithDefaultRole({
      ...userRegister,
      roleName: 'user',
    } as UserRegister);
    if (userCreated) {
      const payload = {
        username: userCreated.name,
        sub: userCreated.id,
        roles: userCreated.roles,
      };
      return {
        access_token: this.jwtService.sign(payload),
        user: {
          id: userCreated.id,
          email: userCreated.email,
          roles: userCreated.roles,
          isVerified: userCreated.isVerified,
        },
      };
    }
    return null;
  }

  async refreshToken(id: string) {
    const user = await this.userService.findById(id);
    if (user && user.id) {
      const payload = {
        username: user.name,
        sub: user.id,
        roles: user.roles,
      };
      return {
        refresh_token: this.jwtService.sign(payload),
        user: {
          id: user.id,
          email: user.email,
          roles: user.roles,
          isVerified: user.isVerified,
        },
      };
    }
    return null;
  }

  async changePassword(id: string, password: string, newPassword: string) {
    const userFound = await this.userService.findById(id);
    if (userFound.password) {
      const isPasswordValid = await bcrypt.compare(
        password,
        userFound.password,
      );

      if (isPasswordValid) {
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        const updateUser = await this.userService.updateUser(id, {
          password: hashedNewPassword,
          updatedAt: new Date(),
        });
        if (updateUser) {
          return userFound;
        }
      }
    }
  }
}
