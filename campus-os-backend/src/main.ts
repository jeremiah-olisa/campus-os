/* eslint-disable prettier/prettier */

// This is the main entry point of our NestJS application
// Like the "main" function in other programming languages

// Import tools from NestJS framework
import { NestFactory } from '@nestjs/core'; // Creates the app
import { AppModule } from './app/app.module'; // Our main app configuration
import { Logger, ValidationPipe } from '@nestjs/common'; // Logging and data validation
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; // API documentation

// This is where our API documentation will be available
export const SWAGGER_API_ROOT = 'api';

// This is the main function that starts our application
async function bootstrap() {
  // Create the NestJS application using our AppModule
  const app = await NestFactory.create(AppModule);

  // Add global validation to check data before it reaches our functions
  app.useGlobalPipes(new ValidationPipe());

  // Set up API documentation (like a user manual for our API)
  const config = new DocumentBuilder()
    .setTitle('CampusOS (Codefactory Multitenant LMS) API') // Title of our API docs
    .setDescription(
      'API documentation for the CampusOS (Codefactory Multitenant Learning Management System (LMS)). <br />' +
        'Includes tenant-aware endpoints, authentication, courses, users, enrollments, and admin operations.',
    ) // Description of what our API does
    .setVersion('1.0.0') // Version number
    .build();

  // Create the documentation
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  // Make docs available at /api URL
  SwaggerModule.setup(SWAGGER_API_ROOT, app, documentFactory);

  // Start the server on port 3000 (or from environment variable)
  await app.listen(process.env.PORT ?? 3000);

  // Tell us where the app is running
  Logger.log(`Application is running on: ${await app.getUrl()}`);
  Logger.log(
    `Application Documentation is running on: ${await app.getUrl()}/${SWAGGER_API_ROOT}`,
  );
}

// Start the application and catch any errors
bootstrap().catch((err) => {
  console.error('Error starting the application', err);
  process.exit(1); // Exit with error code if something goes wrong
});
