import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { Public } from './Decorator/public.decorator';
import { SetAuthCookie } from './Decorator/set-auth-cookie.decorator';
import { AuthCookieInterceptor } from './Interceptors/auth.cookie.interceptor';
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

class ResetPasswordDto {
  email: string;
  token: string;
  password: string;
  confirmPassword: string;
}

@Controller('auth')
@UseInterceptors(AuthCookieInterceptor)
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}
  @Public()
  @Post('/register')
  @SetAuthCookie()
  async register(
    @Body() body: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.register(body);

    return result;
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  @SetAuthCookie()
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.login(body);

    return result;
  }

  @Post('refresh')
  @SetAuthCookie()
  refresh(@Body() body: RefreshDto) {
    const { id } = body;
    return this.authService.refreshAuthToken(id);
  }

  @Post('change-password')
  async changePassword(
    @Res() response: Response,
    @Req() req: Request & AuthRequest,
    @Body() body: ChangePasswordDto,
  ) {
    const { odlPassword, newPassword, confirmedPassword } = body;
    const { userId } = req.user;
    if (newPassword && confirmedPassword && userId) {
      const changedPassword = await this.authService.changePassword(
        userId,
        odlPassword,
        newPassword,
      );
      if (changedPassword) {
        return response.status(200).json({ message: 'password changed' });
      }
    }
    return response.status(400).json({ message: 'password not changed' });
  }

  @Post('logout')
  async logout(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    const token = request.cookies['token'] as string;
    if (token) {
      await this.authService.logout(token);

      response.clearCookie('token', { path: '/' });
      response.clearCookie('userId', { path: '/' });
      response.clearCookie('roles', { path: '/' });
    }
    return {
      message: 'logout',
    };
  }

  @Public()
  @Post('verify-email')
  async verifyEmail(@Body() body: { id: string }) {
    await this.authService.verifyEmail(body.id);
  }

  @Public()
  @Post('recovery-password')
  async recoveryPassword(
    @Body() body: { email: string },
    @Res() response: Response,
  ) {
    await this.authService.recoveryPassword(body.email);

    response.status(200).json({ message: 'email sent' });
  }

  @Public()
  @Post('reset-password')
  async resetPassword(@Body() body: ResetPasswordDto) {
    return await this.authService.resetPassword(
      body.email,
      body.token,
      body.password,
      body.confirmPassword,
    );
  }
}
