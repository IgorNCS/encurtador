import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateShortenerDTO } from './dtos/request/create-shortener.dto';
import { ViewShortenerDTO } from './dtos/responses/view-shortener.dto';
import { ShortenerBuilder } from './builder/shortener.build';
import { ShortenerRepository } from './repositories/shortener.repository';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UpdateShortenerDTO } from './dtos/request/update-shortener.dto';

@Injectable()
export class ShortenerService {
    constructor(private shortenerRepository: ShortenerRepository, private jwtService: JwtService, private userService: UserService) { }

    async register(shortenerDTO: CreateShortenerDTO): Promise<ViewShortenerDTO> {
        let userId = 0;
        if(shortenerDTO.userId){

            await this.userService.findById(shortenerDTO.userId);
            userId = shortenerDTO.userId;
        }

        const shortenerCreateDTO = { ...shortenerDTO, userId };

        await this.shortenerRepository.findByShortenedUrl(shortenerCreateDTO.shortenedUrl);


        const createdShortener = await this.shortenerRepository.create(shortenerCreateDTO);

        const viewCreatedUser: ViewShortenerDTO = ShortenerBuilder.createViewShortener(createdShortener);
        return viewCreatedUser;
    }


    async updateOriginalUrl(shortenedUpdate: UpdateShortenerDTO): Promise<ViewShortenerDTO> {

        const shortener = await this.findShortenerById(shortenedUpdate.id);
        await this.isShortenerOwner(shortener.id,shortenedUpdate.id);

        const updatedShortener = await this.shortenerRepository.updateOriginalUrl(shortenedUpdate);
        const viewUpdatedShortener: ViewShortenerDTO = ShortenerBuilder.createViewShortener(updatedShortener);

        return viewUpdatedShortener;
    }

    async findShortenerById(id){
        const shortener = await this.shortenerRepository.findById(id);

        if (!shortener) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return shortener;
    }

    async isShortenerOwner(shortenerId,id){
        if(shortenerId !== id){
            throw new UnauthorizedException('Invalid credentials');
        }

    }

    
//updateOriginalUrl preciso do novo originalurl, da antiga, da id do shortener e do user id





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