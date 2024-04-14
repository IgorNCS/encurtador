import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateShortenerDTO {
    @ApiProperty({
        description: "Novo destino da URL encurtada.",
        example: "https://wwww.facebook.com"
    })
    @IsString()
    newOriginalUrl: string;

}

