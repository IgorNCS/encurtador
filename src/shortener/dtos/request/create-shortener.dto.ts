import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateShortenerDTO {
  @ApiProperty()
  @IsString()
  originalUrl: string;

}
