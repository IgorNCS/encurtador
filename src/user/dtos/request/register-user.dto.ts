import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDTO {
  @ApiProperty(
    {
      description: "Email",
      example: "igor@igor.com"
    }
  )
  @IsEmail()
  email: string;

  @ApiProperty(
    {
      description: "Password",
      example: "1234abcd"
    }
  )
  @IsNotEmpty()
  @IsString()
  password: string;
}