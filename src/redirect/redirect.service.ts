import { Injectable, NotFoundException } from '@nestjs/common';
import { ShortenerService } from 'src/shortener/shortener.service';

@Injectable()
export class RedirectService {
    constructor(private shortenerService: ShortenerService) { }

    async redirectToOriginalUrl(shortenedUrl: string): Promise<string> {
        const originalUrl = await this.getOriginalUrl(shortenedUrl);
        return originalUrl;
    }

    async getOriginalUrl(shortenedUrl: string): Promise<string> {
        const shortener = await this.shortenerService.findByShortenedUrl(shortenedUrl);
        if (!shortener) {
            throw new NotFoundException('URL Not Found');
        }

        return shortener.originalUrl;
    }
}
