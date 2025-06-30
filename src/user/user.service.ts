import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async createUser(username: string, email: string, password: string) {
    try {
      return await this.prisma.user.create({
        data: { username, email, password },
      });
    } catch (error) {
      throw new BadRequestException('User already exists');
    }
  }
}
