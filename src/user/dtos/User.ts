import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class User {
    @ApiProperty({
        description: "ID do Shortener/Link Encurtado",
        example: 1
    })
    @IsNumber()
    id: number;

    @ApiProperty({
        description: "Email do usuario",
        example: "igor@igor.com"
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: "Senha do usuario",
        example: "1234abcd"
    })
    @IsNotEmpty()
    password: string;

}
