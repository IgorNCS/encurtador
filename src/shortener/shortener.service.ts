import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
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
        let userId = undefined;
        if(shortenerDTO.userId){
            await this.userService.findById(shortenerDTO.userId);
            userId = shortenerDTO.userId;
        }

        const uniqueShortenedUrl = await this.generateUniqueShortenedUrl();
        const shortenerCreateDTO = { ...shortenerDTO, userId:userId, shortenedUrl:uniqueShortenedUrl };
        
        const createdShortener = await this.shortenerRepository.create(shortenerCreateDTO);

        const viewCreatedUser: ViewShortenerDTO = ShortenerBuilder.createViewShortener(createdShortener);
        return viewCreatedUser;
    }


    async updateOriginalUrl(id:number ,shortenedUpdate: UpdateShortenerDTO): Promise<ViewShortenerDTO> {

        const shortener = await this.findShortenerById(shortenedUpdate.id);
        await this.isShortenerOwner(shortener.id,shortenedUpdate.id);

        const updatedShortener = await this.shortenerRepository.updateOriginalUrl(shortenedUpdate);
        const viewUpdatedShortener: ViewShortenerDTO = ShortenerBuilder.createViewShortener(updatedShortener);

        return viewUpdatedShortener;
    }

    async findShortenerById(id){
        const shortener = await this.shortenerRepository.findById(id);

        if (!shortener) {
            throw new UnauthorizedException('Invalid credentials1');
        }

        return shortener;
    }

    async isShortenerOwner(shortenerId,id){
        if(shortenerId !== id){
            throw new UnauthorizedException('Invalid credentials2');
        }

    }

    async findByShortenedUrl(shortenedUrl){
        const shortener = await this.shortenerRepository.findByShortenedUrl(shortenedUrl);

        return shortener;
    }

    async generateUniqueShortenedUrl():Promise<string> {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let shortenedUrl = '';
        for (let i = 0; i < Math.ceil(Math.random() * 6); i++) {
          shortenedUrl += characters.charAt(Math.floor(Math.random() * characters.length));
        }
    
        const existingShortenedUrl = await this.findByShortenedUrl(shortenedUrl);
    

        if (existingShortenedUrl) {
          return this.generateUniqueShortenedUrl();
        }
    
        return shortenedUrl;
      }

    
    }
