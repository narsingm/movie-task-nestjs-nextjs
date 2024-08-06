import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: configService.get<string>('FRONTEND_URL'),
  });

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useStaticAssets(join(__dirname, '..', 'uploads')); // Serve static files from ./uploads directory
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  const config = new DocumentBuilder()
    .setTitle('Movie Task..')
    .setDescription('The Movie Task API')
    .setVersion('1.0')
    .addBearerAuth(undefined, 'Authorization')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = configService.get<number>('PORT');
  await app.listen(port);
  console.log(`Application is running on: ${port}`);
}
bootstrap();
