import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma.service';
import { RegisterShortenerDTO } from '../dtos/request/register-shortener.dto';

@Injectable()
export class ShortenerRepository {
  constructor(private prisma: PrismaService) {}

  async create(shortener: RegisterShortenerDTO) {
    return await this.prisma.shortenedUrl.create({
      data: shortener,
    });
  }

  async findById(id: number) {
    const shortener = await this.prisma.shortenedUrl.findFirst({ where: { id: id } });
    return shortener;
  }

}
