import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movie/movie.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { validationSchema } from './common';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: validationSchema,
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}${file.originalname}`);
        },
      }),
    }),
    DatabaseModule,
    AuthModule,
    MovieModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
