import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, isURL } from 'class-validator';

export class CreateShortenerDTO {

  @ApiProperty({
    description:"URL que será encurtada, utilizada como destino.",
    example:"https://wwww.google.com"
  })
  @IsString()
  originalUrl: string;


}
