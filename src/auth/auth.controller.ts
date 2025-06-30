import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request } from 'express';
import { registerSwagger, loginSwagger, logoutSwagger } from './auth.swagger';

interface AuthRequest extends Request {
  user: { id: string };
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  @applyDecorators(...registerSwagger)
  async register(@Body() body: RegisterDto) {
    const user = await this.authService.register(
      body.username,
      body.email,
      body.password,
    );
    return {
      statusCode: 201,
      message: 'User registered successfully',
      data: user,
    };
  }

  @Public()
  @Post('login')
  @applyDecorators(...loginSwagger)
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body.email, body.password);
    const token = await this.authService.login(user);
    return {
      statusCode: 200,
      message: 'User logged in successfully',
      data: token,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @applyDecorators(...logoutSwagger)
  async logout(@Req() req: AuthRequest) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new Error('Authorization token is missing');
    }
    await this.authService.logout(req.user.id, token);
    return {
      statusCode: 200,
      message: 'User logged out successfully',
    };
  }
}
