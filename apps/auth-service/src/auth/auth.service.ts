import { InjectRedis } from '@nestjs-modules/ioredis';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import Redis from 'ioredis';
import { MailService } from '../mail/mail.service';
import { UserRegister } from '../users/types';
import { UsersService } from '../users/users.service';
interface PayloadJwt {
  username: string;
  sub: string;
  roles: string[];
}
interface DecodedJwt {
  exp: number;
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
    private mailService: MailService,
    @InjectRedis() private readonly redis: Redis,
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
    if (userCreated && userCreated.name) {
      const payload: PayloadJwt = {
        username: userCreated.name,
        sub: userCreated.id,
        roles: userCreated.roles,
      };

      await this.mailService.RegisterEmail({
        to: userCreated.email,
        context: {
          name: userCreated.name,
        },
      });

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
  //--------------------------------------------
  async refreshAuthToken(id: string) {
    const user = await this.userService.findById(id);
    if (user && user.id && user.name) {
      const payload: PayloadJwt = {
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
  //-------------------------------------------
  async changePassword(id: string, password: string, newPassword: string) {
    const userFound = await this.userService.findById(id);
    if (userFound.password) {
      const isPasswordValid = await bcrypt.compare(
        password,
        userFound.password,
      );

      if (isPasswordValid) {
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        const updateUser = await this.userService.updateUser(
          { id: id },
          {
            password: hashedNewPassword,
            updatedAt: new Date(),
          },
        );
        if (updateUser) {
          return userFound;
        }
      }
    }
  }

  async logout(token: string) {
    try {
      const decoded: DecodedJwt = this.jwtService.decode(token);
      const timeLeft = decoded.exp * 1000 - Date.now();

      if (timeLeft > 0) {
        await this.redis.set(`blacklist:${token}`, '1', 'PX', timeLeft + 10000);
      }
    } catch (error) {
      throw new Error(`Token not found: ${(error as Error).message} `);
    }
  }
  //-------------------------------------------
  // verify email
  async verifyEmail(id: string) {
    const userFound = await this.userService.findById(id);
    if (userFound) {
      const updateUser = await this.userService.updateUser(
        { id: id },
        {
          isVerified: true,
          updatedAt: new Date(),
        },
      );
      //think of a better way
      if (updateUser) {
        return userFound;
      }
    }
  }
  //-------------------------------------------
  async recoveryPassword(email: string) {
    const userValid = await this.userService.findByEmail(email);

    const recoveryToken = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();

    await this.redis.set(
      `reset_password:${userValid.email}`,
      recoveryToken,
      'EX',
      600,
    );

    await this.mailService.recoveryPasswordEmail({
      to: userValid.email,
      context: {
        email,
        token: recoveryToken,
      },
    });
  }

  async resetPassword(
    email: string,
    RecoveryToken: string,
    newPassword: string,
    confirmPassword: string,
  ) {
    const userFound = await this.userService.findByEmail(email);
    if (!userFound) {
      throw new BadRequestException('Incorrect Email');
    }

    const storedToken = await this.redis.get(`reset_password:${email}`);
    if (!storedToken) {
      throw new BadRequestException('Token Expired');
    }
    if (RecoveryToken !== storedToken) {
      throw new BadRequestException('Invalid token');
    }

    if (newPassword !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    try {
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      await this.userService.updateUser(
        { id: userFound.id },
        {
          password: hashedNewPassword,
          updatedAt: new Date(),
        },
      );

      await this.redis.del(`reset_password:${email}`);

      return {
        message: 'password reset successfully',
      };
    } catch (error) {
      throw new BadRequestException('Error resetting password');
    }
  }
}
