import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateShortenerDTO {
    @ApiProperty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsString()
    originalUrl: string;

    @ApiProperty()
    @IsString()
    newOriginalUrl: string;

    @ApiProperty()
    @IsNumber()
    userId: number;


}

