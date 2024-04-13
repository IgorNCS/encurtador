import { Controller, Get, HttpStatus, Param, Redirect, Req, Res } from '@nestjs/common';
import { RedirectService } from './redirect.service';
import { Request, Response } from 'express';

@Controller('')
export class RedirectController {
    constructor(private redirectService: RedirectService) { }

    @Get(':shortenedUrl')
    @Redirect('', 301)
    async redirectToOriginalUrl(@Param('shortenedUrl') shortenedUrl: string,@Res() res: Response) {
        const originalUrl = await this.redirectService.redirectToOriginalUrl(shortenedUrl);
        console.log(originalUrl)
        res.setHeader('Cache-Control', 'no-store');
        return { url: `${originalUrl}` };
    }


}
