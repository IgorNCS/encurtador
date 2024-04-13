import { Controller, Get, HttpStatus, Param, Redirect, Req, Res } from '@nestjs/common';
import { RedirectService } from './redirect.service';
import { Request, Response } from 'express';

@Controller('')
export class RedirectController {
    constructor(private redirectService: RedirectService) { }

    // @Get(':shortenedUrl')
    // @Redirect('', 301)
    // async redirectToOriginalUrl(@Param('shortenedUrl') shortenedUrl: string) {
    //     const originalUrl = await this.redirectService.redirectToOriginalUrl(shortenedUrl);
    //     console.log(originalUrl)
    //     return { url: originalUrl };
    // }

    // @Get(':shortenedUrl')
    // @Redirect('', 301)
    // async redirectToOriginalUrl(@Param('shortenedUrl') shortenedUrl: string) {
    //     const originalUrl = await this.redirectService.redirectToOriginalUrl(shortenedUrl);
    //     return originalUrl;
    // }

    @Get(':shortenedUrl')
    @Redirect('', 301)
    async redirectToOriginalUrl(@Param('shortenedUrl') shortenedUrl: string) {
        const originalUrl = await this.redirectService.redirectToOriginalUrl(shortenedUrl);
        console.log(originalUrl)
        return { url: `${originalUrl}` };
        // return { url: originalUrl };
    }

    // @Get('redirect/:redirectUrl')
    // @Redirect(':redirectUrl', 301)
    // async redirect(@Param('shortenedUrl') shortenedUrl: string) {
    //     const originalUrl = await this.redirectService.redirectToOriginalUrl(shortenedUrl);
    //     return { url: originalUrl };
    // }

    // @Get(':shortenedUrl')
    // @Redirect('', 301)
    // async redirect(@Param('shortenedUrl') shortenedUrl: string,@Res() res: Response, @Req() req: Request) {
    //     try {
    //         const originalUrl = await this.redirectService.redirectToOriginalUrl(shortenedUrl);
    //         return { url: originalUrl };
    //     } catch (error) {
    //         return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Redirect Not Found', error: error });

    //     }
    // }
}
