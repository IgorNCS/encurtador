import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserRepository } from './repositories/user.repository';
import { PrismaService } from 'src/db/prisma.service';

@Module({
  imports: [JwtModule.register({ global: true, secret: process.env.JWT_ACCESS_TOKEN_SECRET, signOptions: { expiresIn: "24h" } })],
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService]
})
export class UserModule { }
