import { useQuery } from "@tanstack/react-query";
import { tenantQueryKeys } from "@/features/tenants/constants";

/**
 * Placeholder for future tenant list queries
 * Replace with actual API call when backend is ready
 */
export function useTenantListQuery() {
  return useQuery({
    queryKey: tenantQueryKeys.list(),
    queryFn: async () => {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/tenants');
      // return response.json();
      return [];
    },
    enabled: false, // Disabled by default, enable when needed
  });
}
