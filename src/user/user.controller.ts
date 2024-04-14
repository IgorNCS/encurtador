import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDTO } from './dtos/request/create-user.dto';
import { PayloadLoginDTO } from './dtos/request/login-user.dto';
import { RegisterGuard } from './guards/register.guard';
import { AuthGuard } from './guards/auth.guard';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor( private userService:UserService){}
  
  @ApiOperation({
    summary:'Register User.',
    description:'Post to register User.'
})
  @ApiTags('User')
  @UseGuards(RegisterGuard)
  @Post('register')
  async register(@Body() userDTO: CreateUserDTO, @Res() res: Response) {
    const user = await this.userService.register(userDTO);
    return res
      .status(HttpStatus.CREATED)
      .json({ data: user, status: HttpStatus.CREATED });
  }

  @ApiOperation({
    summary:'Login User',
    description:'Post to login User.'
})
  @ApiTags('User')
  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() payload: PayloadLoginDTO, @Req() req: Request, @Res() res: Response) {
    const data = await this.userService.login(payload);
    req['user'] = data.payload;
    return res.cookie('access_token', data.token).status(HttpStatus.OK).json({ access_token: data.token, status: HttpStatus.OK });
  }

  @ApiOperation({
    summary:'Logout User.',
    description:'Post to logout User. Remove '
})
  @ApiTags('User')
  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Res() res: Response) {
    return res.clearCookie('access_token').status(HttpStatus.OK).json({ access_token: null, status: HttpStatus.OK });
  }
  
  

}
