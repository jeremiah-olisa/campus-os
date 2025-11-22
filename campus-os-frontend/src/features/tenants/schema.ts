import { z } from "zod";

export const createTenantSchema = z.object({
  tenantName: z
    .string()
    .min(2, "Tenant name must be at least 2 characters")
    .max(255, "Tenant name must not exceed 255 characters"),
  tenantSlug: z
    .string()
    .min(2, "Tenant slug must be at least 2 characters")
    .max(100, "Tenant slug must not exceed 100 characters")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  primaryEmail: z
    .email("Please enter a valid email address")
    .max(255, "Email must not exceed 255 characters"),
});

export type CreateTenantFormValues = z.infer<typeof createTenantSchema>;
