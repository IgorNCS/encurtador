import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma.service';
import { RegisterShortenerDTO } from '../dtos/request/register-shortener.dto';
import { Shortener } from '../dtos/Shortener';
import { UpdateShortenerDTO } from '../dtos/request/update-shortener.dto';

@Injectable()
export class ShortenerRepository {
  constructor(private prisma: PrismaService) { }

  async create(shortener: RegisterShortenerDTO) {
    return await this.prisma.shortenedUrl.create({
      data: shortener,
    });
  }

  async updateOriginalUrl(id: number, shortener: UpdateShortenerDTO) {
    return await this.prisma.shortenedUrl.update({
      where: { id: id, deletedAt: null },
      data: {
        originalUrl: shortener.newOriginalUrl,
        updatedAt: new Date(),
      },
    });
  }

  async updateDeleteShortener(id: number) {
    return await this.prisma.shortenedUrl.update({
      where: { id: id },
      data: {
        deletedAt: new Date(),
      },
    });
  }


  async findAllByUserId(userId: number): Promise<Shortener[]> {
    const shorteners = await this.prisma.shortenedUrl.findMany({ where: { userId: userId, deletedAt: null } });
    return shorteners;
  }

  async findById(id: number): Promise<Shortener> {
    const shortener = await this.prisma.shortenedUrl.findFirst({ where: { id: id, deletedAt: null } });
    return shortener;
  }

  async findByShortenedUrl(shortenedUrl: string) {
    const shortener = await this.prisma.shortenedUrl.findFirst({ where: { shortenedUrl: shortenedUrl, deletedAt: null } });
    return shortener;
  }

  async findAll(): Promise<Shortener[]> {
    const shorteners = await this.prisma.shortenedUrl.findMany({ where: { deletedAt: null } });
    return shorteners;
  }

  async incrementClicks(shortenedUrl: string): Promise<void> {
    await this.prisma.shortenedUrl.update({
        where: { shortenedUrl: shortenedUrl },
        data: {
            clicks: {
                increment: 1
            }
        }
    });
}




}
