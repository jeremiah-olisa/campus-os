import type { CreateTenantFormValues } from "@/features/tenants/schema";

export interface CreateTenantResponse {
  id: string;
  name: string;
  slug: string;
  email: string;
  invitationLink: string;
  createdAt: string;
}

export interface TenantErrorResponse {
  message: string;
  code?: string;
  details?: Record<string, string[]>;
}

export type CreateTenantRequest = CreateTenantFormValues;
