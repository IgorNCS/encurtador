import { Body, Controller, Get, HttpStatus, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { ShortenerService } from './shortener.service';
import { Request, Response } from 'express';
import { CreateShortenerDTO } from './dtos/request/create-shortener.dto';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { UpdateShortenerDTO } from './dtos/request/update-shortener.dto';
import { AuthVerifyHeaderGuard } from 'src/user/guards/AuthVerifyHeader.Guard';

@Controller('shortener')
export class ShortenerController {
    constructor(private shortenerService: ShortenerService) { }

    @UseGuards(AuthVerifyHeaderGuard)
    @Post('register')
    async register(@Body() shortenerDTO: CreateShortenerDTO, @Res() res: Response, @Req() req: Request) {
        const shortener = await this.shortenerService.register(shortenerDTO,req);
        return res
            .status(HttpStatus.CREATED)
            .json({ data: shortener, status: HttpStatus.CREATED });
    }

    @UseGuards(AuthGuard)
    @Put('update/:id')
    async update(@Param('id') id: number, @Body() shortenedUpdate: UpdateShortenerDTO, @Res() res: Response, @Req() req: Request) {
        try {
            const updatedShortener = await this.shortenerService.updateOriginalUrl(id, shortenedUpdate, req);
            return res.status(HttpStatus.OK).json({ data: updatedShortener, status: HttpStatus.OK });
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to update shortener',error:error });

        }
    }

    @UseGuards(AuthGuard)
    @Put('delete/:id')
    async delete(@Param('id') id: number, @Res() res: Response, @Req() req: Request) {
        try {
            await this.shortenerService.deleteShortener(id, req);
            return res.status(HttpStatus.NO_CONTENT).send();
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to delete shortener', error: error });

        }
    }

    @UseGuards(AuthGuard)
    @Get('findMyShortener')
    async findMyShortener(@Res() res: Response, @Req() req: Request) {
        try {
            const shorteners = await this.shortenerService.findAllUserShortener(req);
            return res.status(HttpStatus.OK).json({ data: shorteners, status: HttpStatus.OK });
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to fetch shorteners', error: error });
        }
    }





}
