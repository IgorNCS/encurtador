import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsString } from "class-validator";

export class ViewShortenerDTO {

  @ApiProperty({
    description: "ID do Shortener/Link Encurtado",
    example: 1
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: "URL que será encurtado, o destino do redirecionamento",
    example: "https://wwww.google.com"
  })
  @IsString()
  originalUrl: string;

  @ApiProperty({
    description: "URL encurtada, que será utilizada no para redirecionar",
    example: "https://wwww.localhost:300/QVU"
  })
  @IsString()
  shortenedUrl: string;

  @ApiProperty({
    description: "ID do usuario criador da URL/Link encurtado",
    example: 1
  })
  userId: number;

  @ApiProperty({
    description: "Número de vezes que a a URL encurtada foi clicada e redirecionou.",
    example: 356
  })
  @IsNumber()
  clicks: number;

  @ApiProperty({
    description: "Data que a URL encurtada foi criada.",
    example: "2024-04-13T14:00:36.352Z"
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: "Data da última atualização da URL.",
    example: "2024-04-13T14:00:36.352Z"
  })
  @IsDate()
  updatedAt: Date;

}