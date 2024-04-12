import { Body, Controller, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { ShortenerService } from './shortener.service';
import { Request, Response } from 'express';
import { CreateShortenerDTO } from './dtos/request/create-shortener.dto';
import { AuthGuard } from 'src/user/guards/auth.guard';

@Controller('shortener')
export class ShortenerController {
    constructor(private shortenerService: ShortenerService) { }

    
    @Post('register')
    async register(@Body() shortenerDTO: CreateShortenerDTO, @Res() res: Response) {
        const user = await this.shortenerService.register(shortenerDTO);
        return res
            .status(HttpStatus.CREATED)
            .json({ data: user, status: HttpStatus.CREATED });
    }

    



}
