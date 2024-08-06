import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Import ApiProperty decorator

export class loginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}
