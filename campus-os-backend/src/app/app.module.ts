// This is the main module of our NestJS application
// Think of it as the "root" or "main folder" that connects everything together

import { Module } from '@nestjs/common'; // Import the Module decorator from NestJS
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule to read .env files
import { TenantsModule } from '../tenants/tenants.module'; // Import our Tenants module

@Module({
  // This decorator tells NestJS this is a module
  imports: [
    // These are other modules we want to use in this module
    ConfigModule.forRoot({
      // Set up configuration globally
      isGlobal: true, // Make config available everywhere in the app
      envFilePath: '.env', // Read settings from .env file
    }),
    TenantsModule, // Include our tenant management features
  ],
})
export class AppModule {} // This is our main application module
