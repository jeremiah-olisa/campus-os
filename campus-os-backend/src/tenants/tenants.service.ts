// This is the Tenants service
// Contains the business logic for managing tenants
// Like the "brain" that does the actual work

import { PrismaService } from './../prisma/prisma.service'; // Database service
import { Injectable } from '@nestjs/common'; // Injectable decorator
import { CreateTenantDto } from './dto/create-tenant.dto'; // Data structure for creating
import { UpdateTenantDto } from './dto/update-tenant.dto'; // Data structure for updating
import { generateInviteCode } from '../common/utils'; // Our invite code generator

@Injectable() // This makes the service injectable into controllers
export class TenantsService {
  // PrismaService is automatically injected by NestJS
  constructor(private readonly prisma: PrismaService) {}

  // Create a new tenant
  async create(createTenantDto: CreateTenantDto) {
    // Generate a unique invite code for this tenant (64 characters long)
    const invitationCode = generateInviteCode(64);

    // Save the tenant to the database
    const tenant = await this.prisma.tenants.create({
      data: {
        // The data we're saving
        name: createTenantDto.name, // Tenant name
        primaryEmail: createTenantDto.primaryEmail, // Main email
        slug: createTenantDto.slug, // URL-friendly name
        invitationCode, // The generated invite code
      },
      select: { id: true, invitationCode: true }, // Only return these fields
    });

    return tenant; // Return the created tenant
  }

  // Get all tenants from the database
  findAll() {
    return this.prisma.tenants.findMany(); // Get all tenants
  }

  // Find one tenant by ID
  findOne(id: string) {
    return this.prisma.tenants.findFirst({
      where: { id }, // Find tenant with this ID
    });
  }

  // Update a tenant (not implemented yet)
  update(id: number, updateTenantDto: UpdateTenantDto) {
    return `This action updates a #${id} tenant ${JSON.stringify(updateTenantDto)}`; // Placeholder message
  }

  // Delete a tenant (not implemented yet)
  remove(id: number) {
    return `This action removes a #${id} tenant`; // Placeholder message
  }
}
