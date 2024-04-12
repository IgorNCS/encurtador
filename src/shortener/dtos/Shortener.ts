import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Shortener {
    @IsNumber()
    id: number;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

}
