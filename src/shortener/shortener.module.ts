import { Module } from '@nestjs/common';
import { ShortenerController } from './shortener.controller';
import { ShortenerService } from './shortener.service';
import { JwtService } from '@nestjs/jwt';
import { ShortenerRepository } from './repositories/shortener.repository';
import { PrismaService } from 'src/db/prisma.service';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { UserRepository } from 'src/user/repositories/user.repository';

@Module({
  controllers: [ShortenerController],
  providers: [ShortenerService,JwtService,ShortenerRepository,PrismaService,UserService, UserRepository],
  imports:[UserModule]
})
export class ShortenerModule {}


