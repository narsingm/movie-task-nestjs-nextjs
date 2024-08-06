import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  findAll() {
    return "Movie task API's working";
  }

  @Post('api/upload')
  @UseInterceptors(FilesInterceptor('file', 1)) // 'images' is the field name, 5 is the maximum number of files allowed
  async uploadFiles(@UploadedFiles() file) {
    try {
      if (!file || file.length === 0) {
        throw new HttpException('No files uploaded', HttpStatus.BAD_REQUEST);
      } else if (file.length > 5) {
        throw new HttpException(
          'You can upload a maximum of 5 images',
          HttpStatus.BAD_REQUEST,
        );
      }
      const images = file.map((file) => ({
        originalName: file.originalname,
        filename: file.filename,
        url: `http://45.59.167.43:5353/${file.filename}`,
      }));

      return {
        message: 'Files uploaded successfully',
        statusCode: HttpStatus.CREATED,
        filePath: images[0].url,
      };
    } catch (error) {
      // If it's a known error type, rethrow it
      if (error instanceof HttpException) {
        throw error;
      } else {
        // Handle unexpected errors
        console.error('Unexpected error during file upload:', error);
        throw new HttpException(
          'An unexpected error occurred',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
