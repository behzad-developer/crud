import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateCityDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: Boolean,
    required: true,
    nullable: false,
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  isDefault: boolean;
}
