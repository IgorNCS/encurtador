import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { CreateShortenerDTO } from './dtos/request/create-shortener.dto';
import { ViewShortenerDTO } from './dtos/responses/view-shortener.dto';
import { ShortenerBuilder } from './builder/shortener.build';
import { ShortenerRepository } from './repositories/shortener.repository';
import { UpdateShortenerDTO } from './dtos/request/update-shortener.dto';

@Injectable()
export class ShortenerService {
    constructor(private shortenerRepository: ShortenerRepository) { }

    async register(shortenerDTO: CreateShortenerDTO, req): Promise<ViewShortenerDTO> {
        let userId = req?.user?.id || undefined;

        const uniqueShortenedUrl = await this.generateUniqueShortenedUrl();
        const formattedUrl = await this.formatterUrl(shortenerDTO.originalUrl);

        const shortenerCreateDTO = { originalUrl: formattedUrl, userId: userId, shortenedUrl: uniqueShortenedUrl };

        const createdShortener = await this.shortenerRepository.create(shortenerCreateDTO);

        const viewCreatedShortener: ViewShortenerDTO = ShortenerBuilder.createViewShortener(createdShortener);
        return viewCreatedShortener;
    }


    async updateOriginalUrl(id: number, shortenedUpdate: UpdateShortenerDTO, req): Promise<ViewShortenerDTO> {
        const userId = req.user.id
        const shortener = await this.findShortenerById(id);

        await this.isShortenerOwner(shortener.userId, userId);

        shortenedUpdate.newOriginalUrl = await this.formatterUrl(shortenedUpdate.newOriginalUrl)

        const updatedShortener = await this.shortenerRepository.updateOriginalUrl(id, shortenedUpdate);
        const viewUpdatedShortener: ViewShortenerDTO = ShortenerBuilder.createViewShortener(updatedShortener);

        return viewUpdatedShortener;
    }

    async deleteShortener(id: number, req) {
        const userId = req.user.id
        const shortener = await this.findShortenerById(id);

        await this.isShortenerOwner(shortener.userId, userId);
        await this.shortenerRepository.updateDeleteShortener(id)

        return 'Shortener deleted successfully.';
    }

    async findAllUserShortener(req): Promise<ViewShortenerDTO[]> {
        const userId = req.user.id
        const shorteners = await this.shortenerRepository.findAllByUserId(userId);
        const viewShorteners: ViewShortenerDTO[] = shorteners.map(shortener => ShortenerBuilder.createViewShortener(shortener));
        return viewShorteners;
    }

    async findAll(): Promise<ViewShortenerDTO[]> {
        const shorteners = await this.shortenerRepository.findAll();
        const viewShorteners: ViewShortenerDTO[] = shorteners.map(shortener => ShortenerBuilder.createViewShortener(shortener));
        return viewShorteners;
    }


    async findShortenerById(id) {
        const shortener = await this.shortenerRepository.findById(id);

        if (!shortener) {
            throw new UnauthorizedException('Shortener not found');
        }

        if (shortener.deletedAt) {
            throw new UnauthorizedException('Shortener deleted');
        }

        return shortener;
    }

    async isShortenerOwner(shortenerId, id) {
        if (shortenerId !== id) {
            throw new UnauthorizedException('Invalid Owner credentials');
        }

    }

    async findByShortenedUrl(shortenedUrl) {
        const shortener = await this.shortenerRepository.findByShortenedUrl(shortenedUrl);

        return shortener;
    }

    async generateUniqueShortenedUrl(): Promise<string> {
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


    async formatterUrl(url: string): Promise<string> {

        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            return 'https://' + url;
        }

        return url;
    }

    async incrementClicks(shortenedUrl: string): Promise<void> {
        await this.shortenerRepository.incrementClicks(shortenedUrl);
    }



}
