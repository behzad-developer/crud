import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: 'behzad',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: 'passwd',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
    example: 65250795,
  })
  @IsNumber()
  @IsNotEmpty()
  phonenumber: number;
}
