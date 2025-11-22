import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTenantApi } from "@/features/tenants/api/mock";
import { tenantQueryKeys } from "@/features/tenants/constants";
import type { CreateTenantRequest, CreateTenantResponse } from "@/features/tenants/types/api";

export function useCreateTenantMutation() {
  const queryClient = useQueryClient();

  return useMutation<CreateTenantResponse, Error, CreateTenantRequest>({
    mutationFn: async (data: CreateTenantRequest) => {
      return createTenantApi(data);
    },
    onSuccess: () => {
      // Invalidate all tenant queries to refetch fresh data
      queryClient.invalidateQueries({
        queryKey: tenantQueryKeys.all,
      });

      console.log("Tenant created successfully");
    },
    onError: (error: Error) => {
      // Error is automatically captured by TanStack Query
      console.error("Failed to create tenant:", error.message);
    },
  });
}
