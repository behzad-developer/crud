import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: true,
  })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
