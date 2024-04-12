import { Shortener } from '../dtos/Shortener';
import { ViewShortenerDTO } from '../dtos/responses/view-shortener.dto';

export class ShortenerBuilder {
  static createViewShortener(shortener: Shortener): ViewShortenerDTO {
    const { id, email } = shortener;

    return { id, email };
  }
}
