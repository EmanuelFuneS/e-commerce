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
  refresh(@Request() req: any) {
    // refreshToken method
    return;
  }

  @Post('change-password')
  async changePassword(
    @Request() req: any,
    @Body() body: ChangePasswordDto,
  ): Promise<{ message: string }> {
    //changePassword method
    return {
      message: '',
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
