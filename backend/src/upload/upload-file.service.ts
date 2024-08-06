// src/common/services/s3.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

interface FileUploadResult {
  Location: string;
  ETag: string;
  Bucket: string;
  Key: string;
}
@Injectable()
export class UploadFileService {
  private s3: AWS.S3;

  constructor(private readonly configService: ConfigService) {
    const sts = new AWS.STS();

    // Assume role parameters
    const assumeRoleParams = {
      RoleArn: this.configService.get<string>('ROLE_ARN'),
      RoleSessionName: this.configService.get<string>('ROLE_SESSION_NAME'),
    };
    // Assume the role
    sts.assumeRole(assumeRoleParams, (err, data) => {
      if (err) {
        console.error('Error assuming role:', err);
      } else {
        // Use assumed role credentials to configure the S3 client
        const credentials = new AWS.Credentials(
          data.Credentials.AccessKeyId,
          data.Credentials.SecretAccessKey,
          data.Credentials.SessionToken,
        );
        this.s3 = new AWS.S3({ credentials });
      }
    });
  }

  async uploadFile(
    bucket: string,
    files,
    folder,
  ): Promise<AWS.S3.ManagedUpload.SendData> {
    const uploadedFiles: any = [];
    for (const file of files) {
      const { originalname } = file;
      const params = {
        Bucket: bucket,
        Key: `${folder}/${Date.now()}.${originalname.split('.').pop()}`,
        Body: file.buffer,
      };

      try {
        const uploadResult = await this.s3.upload(params).promise();
        const result: FileUploadResult = {
          Location: uploadResult.Location,
          ETag: uploadResult.ETag,
          Bucket: uploadResult.Bucket,
          Key: uploadResult.Key,
        };
        const urlParts = result.Location.split('/');
        const imgUrl = `${this.configService.get<string>('AWS_REPLACE_URL')}/${folder}/${urlParts[urlParts.length - 1]}`;
        uploadedFiles.push(imgUrl);
      } catch (error) {
        console.log(`Failed to upload file: ${error.message}`);
      }
    }

    return uploadedFiles;
  }
}
