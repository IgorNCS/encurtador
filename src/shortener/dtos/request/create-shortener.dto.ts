import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, isURL } from 'class-validator';

export class CreateShortenerDTO {
  @ApiProperty()
  @IsString()
  originalUrl: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  onlyAuthenticated: boolean = false;

}
