import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDTO } from './dtos/request/create-user.dto';
import { PayloadLoginDTO } from './dtos/request/login-user.dto';
import { RegisterGuard } from './guards/register.guard';

@Controller('user')
export class UserController {
  constructor( private userService:UserService){}
    
  @UseGuards(RegisterGuard)
  @Post('register')
  async register(@Body() userDTO: CreateUserDTO, @Res() res: Response) {
    const user = await this.userService.register(userDTO);
    return res
      .status(HttpStatus.CREATED)
      .json({ data: user, status: HttpStatus.CREATED });
  }


  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() payload: PayloadLoginDTO, @Req() req: Request, @Res() res: Response) {
    const data = await this.userService.login(payload);
    req['user'] = data.payload;
    return res.cookie('access_token', data.token).status(HttpStatus.OK).json({ access_token: data.token, status: HttpStatus.OK });
  }

  @Get('get')
  teste(){
    return 'oi'
  }
  
  

}
