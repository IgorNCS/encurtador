import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDTO } from './dtos/request/create-user.dto';

@Controller('user')
export class UserController {
  constructor( private userService:UserService){}
    
  @Post('register')
  async register(@Body() userDTO: CreateUserDTO, @Res() res: Response) {
    const user = await this.userService.register(userDTO);
    return res
      .status(HttpStatus.CREATED)
      .json({ data: user, status: HttpStatus.CREATED });
  }

  @Get('get')
  teste(){
    return 'oi'
  }
  
  

}
