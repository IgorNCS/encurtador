import { Body, Controller, Get, HttpStatus, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { ShortenerService } from './shortener.service';
import { Request, Response } from 'express';
import { CreateShortenerDTO } from './dtos/request/create-shortener.dto';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { UpdateShortenerDTO } from './dtos/request/update-shortener.dto';
import { AuthVerifyHeaderGuard } from 'src/user/guards/AuthVerifyHeader.Guard';
import { UpdateShortenerSwagger, DeleteShortenerSwagger, RegisterShortenerSwagger, FindMyShortenerSwagger, FindAllShortenerSwagger } from './docs/swagger-shortener-data';


@Controller('shortener')
export class ShortenerController {
    constructor(private shortenerService: ShortenerService) { }

    @RegisterShortenerSwagger()
    @UseGuards(AuthVerifyHeaderGuard)
    @Post('register')
    async register(@Body() shortenerDTO: CreateShortenerDTO, @Res() res: Response, @Req() req: Request) {
        const shortener = await this.shortenerService.register(shortenerDTO, req);
        return res
            .status(HttpStatus.CREATED)
            .json({ data: shortener, status: HttpStatus.CREATED });
    }

    @UpdateShortenerSwagger()
    @UseGuards(AuthGuard)
    @Put('update/:IDShortenedUrl')
    async update(@Param('IDShortenedUrl') id: number, @Body() shortenedUpdate: UpdateShortenerDTO, @Res() res: Response, @Req() req: Request) {
        try {
            const updatedShortener = await this.shortenerService.updateOriginalUrl(id, shortenedUpdate, req);
            return res.status(HttpStatus.OK).json({ data: updatedShortener, status: HttpStatus.OK });
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to update shortener', error: error });

        }
    }

    @DeleteShortenerSwagger()
    @UseGuards(AuthGuard)
    @Put('delete/:IDShortenedUrl')
    async delete(@Param('IDShortenedUrl') id: number, @Res() res: Response, @Req() req: Request) {
        try {
            await this.shortenerService.deleteShortener(id, req);
            return res.status(HttpStatus.NO_CONTENT).send();
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to delete shortener', error: error });

        }
    }

    @FindMyShortenerSwagger()
    @UseGuards(AuthGuard)
    @Get('findMyShortener')
    async findMyShortener(@Res() res: Response, @Req() req: Request) {
        try {
            const shorteners = await this.shortenerService.findAllUserShortener(req);
            return res.status(HttpStatus.OK).json({ data: shorteners, status: HttpStatus.OK });
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to get yours shorteners', error: error });
        }
    }

    @FindAllShortenerSwagger()
    @Get('findAll')
    async findAll(@Res() res: Response) {
        try {
            const shorteners = await this.shortenerService.findAll();
            return res.status(HttpStatus.OK).json({ data: shorteners, status: HttpStatus.OK });
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to get all shorteners', error: error });
        }
    }


}
