import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { Public } from './Decorator/public.decorator';
import type { AuthRequest } from './types';

class RegisterDto {
  email: string;
  name: string;
  password: string;
}

class LoginDto {
  email: string;
  password: string;
}

class ChangePasswordDto {
  odlPassword: string;
  newPassword: string;
  confirmedPassword: boolean; // for front when validate new password
}
class RefreshDto {
  id: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}
  @Public()
  @Post('/register')
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('refresh')
  refresh(@Body() body: RefreshDto) {
    const { id } = body;
    return this.authService.refreshToken(id);
  }

  @Post('change-password')
  async changePassword(
    @Request() req: AuthRequest,
    @Body() body: ChangePasswordDto,
  ): Promise<{ message: string }> {
    const { odlPassword, newPassword, confirmedPassword } = body;
    const { userId } = req.user;
    if (newPassword && confirmedPassword && userId) {
      const changedPassword = await this.authService.changePassword(
        userId,
        odlPassword,
        newPassword,
      );
      if (changedPassword) {
        return {
          message: 'changed password',
        };
      }
    }
    return {
      message: 'its no possible change password',
    };
  }

  @Post('logout')
  async logout(): Promise<{ message: string }> {
    //method logout
    return {
      message: '',
    };
  }

  @Post('forgot-password')
  async forgotPassword() {
    //forgotPassword method
    return;
  }
}
