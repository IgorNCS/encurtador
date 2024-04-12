import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma.service';
// import { CreateUserDTO } from '../dtos/create-user.dto';
import { RegisterUserDTO } from '../dtos/request/register-user.dto';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(userDTO: RegisterUserDTO) {
    return await this.prisma.user.create({
      data: userDTO,
    });
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findFirst({ where: { email } });
    return user;
  }

  async findById(id: number) {
    const user = await this.prisma.user.findFirst({ where: { id } });
    return user;
  }

  

}
