import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegisterShortenerDTO {
  @ApiProperty()
  @IsString()
  originalUrl: string;

  @ApiProperty()
  @IsString()
  shortenedUrl: string;

  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNumber()
  clicks: number;
}

// model ShortenedUrl {
//     id            Int       @id @default(autoincrement())
//     originalUrl   String
//     shortenedUrl  String    @unique
//     userId        Int       
//     clicks        Int       @default(0)
//     createdAt     DateTime  @default(now())
//     updatedAt     DateTime  @updatedAt
  
//     user          User      @relation(fields: [userId], references: [id])
//   }

/*
VERIFICAR SE O USERID É VALIDO
VERIFICAR SE JÁ EXISTE O SHORTENEDURL

*/