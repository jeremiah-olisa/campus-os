/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const SWAGGER_API_ROOT = 'api';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('CampusOS (Codefactory Multitenant LMS) API')
    .setDescription(
      'API documentation for the CampusOS (Codefactory Multitenant Learning Management System (LMS)). <br />' +
        'Includes tenant-aware endpoints, authentication, courses, users, enrollments, and admin operations.',
    )
    .setVersion('1.0.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_API_ROOT, app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);

  Logger.log(`Application is running on: ${await app.getUrl()}`);
  Logger.log(
    `Application Documentation is running on: ${await app.getUrl()}/${SWAGGER_API_ROOT}`,
  );
}

bootstrap().catch((err) => {
  console.error('Error starting the application', err);
  process.exit(1);
});
