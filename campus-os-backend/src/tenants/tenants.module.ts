// This is the Tenants module
// Like a folder that groups together everything related to tenant management

import { Module } from '@nestjs/common'; // Import Module decorator
import { TenantsService } from './tenants.service'; // Our business logic
import { TenantsController } from './tenants.controller'; // Our API endpoints
import { PrismaService } from '../prisma/prisma.service'; // Database service

@Module({
  // This decorator defines what this module contains
  controllers: [TenantsController], // The API endpoints (controllers)
  providers: [PrismaService, TenantsService], // The services this module provides
})
export class TenantsModule {} // This is our tenants module
