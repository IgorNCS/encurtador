import { Module } from '@nestjs/common';
import { RedirectController } from './redirect.controller';
import { RedirectService } from './redirect.service';
import { ShortenerService } from 'src/shortener/shortener.service';
import { ShortenerModule } from 'src/shortener/shortener.module';
import { PrismaService } from 'src/db/prisma.service';

@Module({
  controllers: [RedirectController],
  providers: [RedirectService,ShortenerService,PrismaService],
  imports:[ShortenerModule]
})
export class RedirectModule {}
