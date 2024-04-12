import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma.service';
import { RegisterShortenerDTO } from '../dtos/request/register-shortener.dto';
import { Shortener } from '../dtos/Shortener';
import { UpdateShortenerDTO } from '../dtos/request/update-shortener.dto';

@Injectable()
export class ShortenerRepository {
  constructor(private prisma: PrismaService) {}

  async create(shortener: RegisterShortenerDTO) {
    return await this.prisma.shortenedUrl.create({
      data: shortener,
    });
  }

  async updateOriginalUrl(shortener:UpdateShortenerDTO) {
    return await this.prisma.shortenedUrl.update({
      where: { id: shortener.id },
      data: {
        originalUrl: shortener.originalUrl,
        updatedAt: new Date(),
      },
    });
  }

  async findById(id: number) {
    const shortener = await this.prisma.shortenedUrl.findFirst({ where: { id: id } });
    return shortener;
  }

  async findByShortenedUrl(shortenedUrl: string) {
    const shortener = await this.prisma.shortenedUrl.findFirst({ where: { shortenedUrl: shortenedUrl } });
    return shortener;
  }

  

}
