import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register({ email, password }: RegisterDto, res: Response) {
    const hashedPassword = await hash(password);

    const createdUser = await this.usersService.createOne({
      email,
      hashedPassword,
    });

    return await this.generateTokens(createdUser.id, res);
  }

  async validateUser(email: string, password: string) {
    const userByEmail = await this.usersService.getOne({ email });

    if (!userByEmail) {
      return null;
    }

    const isPasswordValid = await verify(
      userByEmail.hashedPassword,
      password,
    );

    if (!isPasswordValid) {
      return null;
    }

    return userByEmail;
  }

  //Private method
  async generateTokens(userId: number, res: Response) {
    const accsessToken = await this.jwtService.signAsync(
      { userId },
      {
        secret: this.configService.getOrThrow('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.getOrThrow('JWT_ACCESS_EXPIRES'),
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      { userId },
      {
        secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.getOrThrow('JWT_REFRESH_EXPIRES'),
      },
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
    });

    return accsessToken;
  }
}
