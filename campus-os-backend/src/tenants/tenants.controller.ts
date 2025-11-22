// This is the controller for tenant operations
// Like a waiter that takes orders (API requests) and serves responses
// Controllers handle HTTP requests like GET, POST, PUT, DELETE

import {
  Controller, // Makes this class a controller
  Get, // Decorator for GET requests (read data)
  Post, // Decorator for POST requests (create data)
  Body, // Gets data from request body
  Patch, // Decorator for PATCH requests (update data)
  Param, // Gets data from URL parameters
  Delete, // Decorator for DELETE requests (remove data)
} from '@nestjs/common';

import { TenantsService } from './tenants.service'; // Import our business logic service
import { CreateTenantDto } from './dto/create-tenant.dto'; // Data structure for creating tenants
import { UpdateTenantDto } from './dto/update-tenant.dto'; // Data structure for updating tenants

@Controller('tenants') // This controller handles URLs that start with /tenants
export class TenantsController {
  // The service is automatically injected by NestJS
  constructor(private readonly tenantsService: TenantsService) {}

  // POST /tenants - Create a new tenant
  @Post() // This handles POST requests to /tenants
  create(@Body() createTenantDto: CreateTenantDto) {
    // Get data from request body
    return this.tenantsService.create(createTenantDto); // Call service to do the work
  }

  // GET /tenants - Get all tenants
  @Get() // This handles GET requests to /tenants
  findAll() {
    // No parameters needed for getting all
    return this.tenantsService.findAll(); // Call service to get all tenants
  }

  // GET /tenants/:id - Get one tenant by ID
  @Get(':id') // :id means the ID comes from the URL
  findOne(@Param('id') id: string) {
    // Get the ID from the URL
    return this.tenantsService.findOne(id); // Call service to find one tenant
  }

  // PATCH /tenants/:id - Update a tenant
  @Patch(':id') // Update tenant with specific ID
  update(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto) {
    return this.tenantsService.update(+id, updateTenantDto); // +id converts string to number
  }

  // DELETE /tenants/:id - Delete a tenant
  @Delete(':id') // Delete tenant with specific ID
  remove(@Param('id') id: string) {
    return this.tenantsService.remove(+id); // Call service to delete
  }
}
