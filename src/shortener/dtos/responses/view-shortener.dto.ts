export class ViewShortenerDTO {
  id: number;
  originalUrl: string;
  shortenedUrl: string;
  userId: number;
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
  onlyAuthenticated: boolean;
}