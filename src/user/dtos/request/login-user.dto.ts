import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class PayloadLoginDTO {
    @ApiProperty(
        {
          description:"Email",
          example:"igor@igor.com"
        }
      )
    @IsEmail()
    email: string;

    @ApiProperty(
        {
          description:"Password",
          example:"1234abcd"
        }
      )
    @IsNotEmpty()
    password: string;
}
 