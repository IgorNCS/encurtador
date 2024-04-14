import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class ViewUserDTO {
  @ApiProperty({
    description: "ID do User",
    example: 1
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: "Email do User",
    example: "igor@igor.com"
  })
  @IsString()
    email: string;
  }
  