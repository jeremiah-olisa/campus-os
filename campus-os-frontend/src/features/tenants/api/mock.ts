import type { CreateTenantRequest, CreateTenantResponse } from "@/features/tenants/types/api";

/**
 * Mock API delay in milliseconds
 * Set this to simulate network latency
 */
const MOCK_DELAY = 1500;

/**
 * Mock implementation of createTenant API call
 * Replace this with actual API call when backend is ready
 */
export async function createTenantApi(data: CreateTenantRequest): Promise<CreateTenantResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));

  // Generate mock response
  const response: CreateTenantResponse = {
    id: `tenant_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name: data.tenantName,
    slug: data.tenantSlug,
    email: data.primaryEmail,
    invitationLink: `https://lms.com/setup/inv_${generateMockToken()}`,
    createdAt: new Date().toISOString(),
  };

  return response;
}

/**
 * Helper function to generate mock invitation token
 */
function generateMockToken(): string {
  return Array.from({ length: 20 })
    .map(() => Math.random().toString(36).charAt(2))
    .join("")
    .toUpperCase();
}
