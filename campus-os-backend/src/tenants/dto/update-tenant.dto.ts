// This defines the structure for updating tenant data
// All fields are optional (can be undefined) since you might only update some fields

import { PartialType } from '@nestjs/swagger'; // Makes all fields optional
import { CreateTenantDto } from './create-tenant.dto'; // Base structure

// This automatically makes all fields from CreateTenantDto optional
export class UpdateTenantDto extends PartialType(CreateTenantDto) {}
