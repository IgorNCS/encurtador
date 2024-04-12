import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './repositories/user.repository';
import { PrismaService } from 'src/db/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, JwtService,UserRepository, PrismaService]
})
export class UserModule {}
