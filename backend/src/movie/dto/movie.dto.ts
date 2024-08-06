import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Import ApiProperty decorator

export class CreateMovieDto {
  @ApiProperty() // Add ApiProperty decorator to add Swagger metadata
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly publishingYear: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly image: string;
}
export class UpdateMovieDto {
  @ApiProperty() // Add ApiProperty decorator to add Swagger metadata
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly publishingYear: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly image: string;
}

export class CommonPaginationDto {
  @ApiProperty({ required: false, default: 1 })
  @IsOptional()
  page?: number;

  @ApiProperty({ required: false, default: 10 })
  @IsOptional()
  limit?: number;
}
