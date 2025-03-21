import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async createOne({ email, hashedPassword }: CreateUserDto) {
    const userByEmail = await this.prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (userByEmail) {
      throw new ConflictException('User with this email already exists');
    }

    const createdUser = await this.prisma.users.create({
      data: {
        email,
        hashedPassword,
      },
    });

    return createdUser;
  }
}
