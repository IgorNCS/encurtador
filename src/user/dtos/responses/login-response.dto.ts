import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class LoginResponse {
  @ApiProperty({
    description: "Token de acesso do usuário",
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJpZ29yQGlnb3IuY29tIiwiaWF0IjoxNzEzMTA5NjQ1LCJleHAiOjE3MTMxOTYwNDV9.RSyiygY51qJfy5WAW1Rb7VI3krHsA_H5oa2P_Z05zZc"
  })
  @IsString()
  access_token: string;

  @ApiProperty({
    description: "E-mail do usuário",
    example: 200
  })
  @IsNumber()
  status: number;
}
