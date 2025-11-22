// This defines the structure of data needed to create a new tenant
// Like a form that specifies what information is required

import { ApiProperty } from '@nestjs/swagger'; // For API documentation

export class CreateTenantDto {
  // DTO = Data Transfer Object
  @ApiProperty() // This tells Swagger to include this field in API docs
  name: string; // The name of the tenant (company/school name)

  @ApiProperty() // Include in API documentation
  slug: string; // URL-friendly version of the name (like "my-company")

  @ApiProperty() // Include in API documentation
  primaryEmail: string; // Main contact email for the tenant
}
