import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

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
  @IsOptional()
  @IsNumber()
  userId?: number;

  @ApiProperty()
  @IsBoolean()
  onlyAuthenticated: boolean;
}
