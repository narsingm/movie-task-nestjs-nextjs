import {
  IsNotEmpty,
  MinLength,
  IsEmail,
  Matches,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Import ApiProperty decorator

export class CreateUserDto {
  @ApiProperty() // Add ApiProperty decorator to add Swagger metadata
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}
export class profileDto {
  @ApiProperty() // Add ApiProperty decorator to add Swagger metadata
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly created_at: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly updated_at: string;
}

export class callBackRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(10)
  @Matches(/^\d{10}$/) // Adjusted regex to exactly 10 digits
  phone: string;

  @ApiProperty({ default: '+91' })
  @IsOptional()
  countryCode: string;
}
