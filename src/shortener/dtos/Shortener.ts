import { IsDate, IsNumber, IsString, IsBoolean } from 'class-validator';

export class Shortener {
    @IsNumber()
    id: number;

    @IsString()
    originalUrl: string;

    @IsString()
    shortenedUrl: string;

    @IsNumber()
    userId?: number;

    @IsNumber()
    clicks: number;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;

    @IsDate()
    deletedAt: Date;

    @IsBoolean()
    onlyAuthenticated:boolean;
}
