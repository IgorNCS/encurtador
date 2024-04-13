import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateShortenerDTO {
    @ApiProperty()
    @IsString()
    originalUrl: string;

    @ApiProperty()
    @IsString()
    newOriginalUrl: string;

}

