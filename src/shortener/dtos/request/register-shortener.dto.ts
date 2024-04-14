import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class RegisterShortenerDTO {

  @ApiProperty({
    description: "URL que será encurtada, utilizada como destino.",
    example: "https://wwww.google.com"
  })
  @IsString()
  @IsNotEmpty()
  originalUrl: string;

  @ApiProperty({
    description: "URL encurtada, utilizada para redirecionar ao destino.",
    example: "https://wwww.google.com"
  })
  @IsString()
  @IsNotEmpty()
  shortenedUrl: string;

  @ApiProperty({
    description: "ID do usuario criador da URL/Link encurtado. Se não existir é porque foi criada sem nenhum usuario autenticado.",
    example: 1,
    default: undefined
  })
  userId: number;

}
