import { Injectable } from '@nestjs/common';
import { CreateShortenerDTO } from './dtos/request/create-shortener.dto';
import { ViewShortenerDTO } from './dtos/responses/view-shortener.dto';
import { ShortenerBuilder } from './builder/shortener.build';
import { ShortenerRepository } from './repositories/shortener.repository';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ShortenerService {
    constructor(private shortenerRepository: ShortenerRepository, private jwtService: JwtService, private userService: UserService) { }

    // : Promise<ViewShortenerDTO>
    async register(shortenerDTO: CreateShortenerDTO) {

        await this.userService.findById(shortenerDTO.userId)


        // const viewCreatedUser: ViewShortenerDTO = ShortenerBuilder.createViewShortener();
        return 'viewCreatedUser'

    }


}

//   @ApiProperty()
//   @IsString()
//   originalUrl: string;

//   @ApiProperty()
//   @IsString()
//   shortenedUrl: string;

//   @ApiProperty()
//   @IsNumber()
//   userId: number;

//   @ApiProperty()
//   @IsNumber()
//   clicks: number;
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