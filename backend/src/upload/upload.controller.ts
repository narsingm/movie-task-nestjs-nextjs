import {
  Controller,
  Post,
  HttpException,
  HttpStatus,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadFileService } from './upload-file.service';
import { ConfigService } from '@nestjs/config';
@ApiBearerAuth('Authorization')
@ApiTags('Upload')
@Controller('api/uploadfile')
export class UploadController {
  constructor(
    private readonly uploadFileService: UploadFileService,
    private readonly configService: ConfigService,
  ) {}
  @Post('')
  @UseInterceptors(FilesInterceptor('file', 1))
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
      const bucket = this.configService.get<string>('BUCKET');
      const result = await this.uploadFileService.uploadFile(
        bucket,
        file,
        'movie-management',
      );
      return {
        message: 'file uplaoded success',
        statusCode: HttpStatus.CREATED,
        filePath: result[0],
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          'An unexpected error occurred',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
