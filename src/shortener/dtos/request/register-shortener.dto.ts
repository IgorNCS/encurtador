import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class RegisterShortenerDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  originalUrl: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  shortenedUrl: string;

  @ApiProperty()
  @IsOptional() // Tornando userId opcional
  @IsNumber()
  userId?: number;
}
