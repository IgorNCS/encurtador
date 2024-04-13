import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateShortenerDTO {

    @ApiProperty()
    @IsString()
    newOriginalUrl: string;

}

