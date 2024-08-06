import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { AuthService } from 'src/auth/auth.service';
import { UploadFileService } from './upload-file.service';
@Module({
  controllers: [UploadController],
  providers: [AuthService, UploadFileService],
  exports: [],
})
export class UploadModule {}
