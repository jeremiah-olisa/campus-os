/**
 * Query keys factory for tenants feature
 * Follows TanStack Query best practices for query key management
 * 
 * Reference: https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults#query-key-factory
 */

export const tenantQueryKeys = {
  // Base key for all tenant-related queries
  all: ["tenants"] as const,

  // Query keys for lists
  lists: () => [...tenantQueryKeys.all, "list"] as const,
  list: (filters?: { page?: number; limit?: number; search?: string }) =>
    [...tenantQueryKeys.lists(), { filters }] as const,

  // Query keys for individual tenant details
  details: () => [...tenantQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...tenantQueryKeys.details(), id] as const,

  // Query keys for mutations (cache invalidation)
  mutations: () => [...tenantQueryKeys.all, "mutations"] as const,
} as const;

/**
 * Usage Examples:
 * 
 * 1. For useQuery - Fetch all tenants:
 *    useQuery({
 *      queryKey: tenantQueryKeys.list(),
 *      queryFn: fetchTenants,
 *    })
 * 
 * 2. For useQuery - Fetch tenants with filters:
 *    useQuery({
 *      queryKey: tenantQueryKeys.list({ page: 1, limit: 10 }),
 *      queryFn: () => fetchTenants({ page: 1, limit: 10 }),
 *    })
 * 
 * 3. For useQuery - Fetch specific tenant:
 *    useQuery({
 *      queryKey: tenantQueryKeys.detail("tenant-123"),
 *      queryFn: () => fetchTenant("tenant-123"),
 *    })
 * 
 * 4. For useMutation - Invalidate all tenant queries after create:
 *    mutationFn: createTenant,
 *    onSuccess: () => {
 *      queryClient.invalidateQueries({
 *        queryKey: tenantQueryKeys.all,
 *      })
 *    }
 * 
 * 5. For useMutation - Invalidate specific tenant after update:
 *    mutationFn: updateTenant,
 *    onSuccess: (data) => {
 *      queryClient.invalidateQueries({
 *        queryKey: tenantQueryKeys.detail(data.id),
 *      })
 *    }
 */
