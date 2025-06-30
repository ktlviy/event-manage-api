import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  HttpStatus,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async login(user: User) {
    const existingSession = await this.prisma.session.findFirst({
      where: { userId: user.id },
    });
    if (existingSession) {
      throw new ConflictException('User is already logged in.');
    }

    const payload = { id: user.id, username: user.username, email: user.email };
    const token = this.jwtService.sign(payload);

    await this.prisma.session.create({
      data: { userId: user.id, token },
    });

    return { access_token: token };
  }

  async register(username: string, email: string, password: string) {
    if (!password || password.length < 6) {
      throw new UnauthorizedException(
        'Password must be at least 6 characters long',
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userService.createUser(
      username,
      email,
      hashedPassword,
    );
    return {
      statusCode: HttpStatus.CREATED,
      message: 'User registered successfully',
      data: user,
    };
  }

  async loginWithCredentials(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { id: user.id, username: user.username, email: user.email };
    const token = this.jwtService.sign(payload);

    await this.prisma.session.create({
      data: { userId: user.id, token },
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'User logged in successfully',
      data: { access_token: token },
    };
  }

  async logout(userId: string, token: string) {
    await this.prisma.session.deleteMany({ where: { userId, token } });
    return {
      statusCode: HttpStatus.OK,
      message: 'User logged out successfully',
    };
  }

  async isLoggedIn(userId: string) {
    const session = await this.prisma.session.findFirst({ where: { userId } });
    return !!session;
  }
}
