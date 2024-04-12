import { Shortener } from '../dtos/Shortener';
import { ViewShortenerDTO } from '../dtos/responses/view-shortener.dto';

export class ShortenerBuilder {
  static createViewShortener(shortener: Shortener): ViewShortenerDTO {
    const { id, originalUrl, shortenedUrl, userId, clicks, createdAt, updatedAt } = shortener;

    return { id, originalUrl, shortenedUrl, userId, clicks, createdAt, updatedAt };
  }
}

