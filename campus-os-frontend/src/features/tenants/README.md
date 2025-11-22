# Tenants Feature

## Overview

The tenants feature is organized into separate concerns using TanStack Query for API state management. This structure makes it easy to scale and maintain the code.

## Folder Structure

```
src/features/tenants/
├── schema.ts                      # Zod validation schemas
├── index.ts                       # Feature exports
├── hooks/
│   ├── use-create-tenant.ts      # Custom hook combining form logic with mutations
│   └── index.ts
├── mutations/
│   ├── use-create-tenant-mutation.ts   # TanStack Query mutation for creating tenants
│   └── index.ts
├── queries/
│   ├── use-tenant-list.ts        # Placeholder for future tenant list queries
│   └── index.ts
├── components/
│   ├── create-tenant-form.tsx    # Form component
│   ├── tenant-success-alert.tsx  # Success alert with copy functionality
│   ├── error-alert.tsx           # Error alert component
│   └── index.ts
├── types/
│   ├── api.ts                    # API response types
│   └── index.ts
├── api/
│   └── mock.ts                   # Mock API implementations
├── constants/
│   ├── query-keys.ts             # TanStack Query key factory
│   └── index.ts
└── README.md
```

## Key Files & Their Responsibilities

### Schema (`schema.ts`)
- Defines Zod validation schema for create tenant form
- Exports `CreateTenantFormValues` type for TypeScript support

### API Layer (`api/mock.ts`)
- Contains mock implementations of API calls
- `createTenantApi()` - Simulates tenant creation with 1.5s delay
- Easy to replace with actual API calls

### Mutations (`mutations/`)
- `useCreateTenantMutation()` - TanStack Query mutation hook
- Handles loading, error, and success states automatically
- Manages side effects (onSuccess, onError callbacks)

### Queries (`queries/`)
- Placeholder for future read operations
- `useTenantListQuery()` - Prepared structure for fetching tenant list
- Currently disabled by default

### Hooks (`hooks/`)
- `useCreateTenant()` - High-level hook combining form and mutation logic
- Returns form, loading state, error, success data, and helper functions
- Abstracts complexity from components

### Components (`components/`)
- `CreateTenantForm` - Form with all input fields
- `TenantSuccessAlert` - Shows success message and invitation link
- `ErrorAlert` - Displays error messages

### Types (`types/`)
- `CreateTenantResponse` - API response shape
- `CreateTenantRequest` - API request shape
- `TenantErrorResponse` - Error response shape

## Usage Example

```tsx
import { useCreateTenant, CreateTenantForm, TenantSuccessAlert, ErrorAlert } from '@/features/tenants';

function CreatePage() {
  const { form, onSubmit, isLoading, error, successData, generateSlug } = useCreateTenant();

  return (
    <div>
      <ErrorAlert error={error} />
      <CreateTenantForm 
        form={form} 
        onSubmit={onSubmit} 
        isLoading={isLoading}
        onGenerateSlug={generateSlug}
      />
      {successData && <TenantSuccessAlert {...successData} />}
    </div>
  );
}
```

## State Management with TanStack Query

All state management is handled by TanStack Query:
- **Loading**: `mutation.isPending`
- **Error**: `mutation.error` & `mutation.isError`
- **Success Data**: `mutation.data`
- **Mutation Function**: `mutation.mutateAsync(data)`

No manual useState is needed!

## Query Keys Management

All query keys are centralized in `constants/query-keys.ts` following TanStack Query best practices:

```tsx
import { tenantQueryKeys } from '@/features/tenants';

// Using query keys in queries
useQuery({
  queryKey: tenantQueryKeys.list(),
  queryFn: fetchTenants,
})

// Using query keys with filters
useQuery({
  queryKey: tenantQueryKeys.list({ page: 1, limit: 10 }),
  queryFn: () => fetchTenants({ page: 1, limit: 10 }),
})

// Using query keys for specific tenant
useQuery({
  queryKey: tenantQueryKeys.detail('tenant-123'),
  queryFn: () => fetchTenant('tenant-123'),
})

// Invalidating queries in mutations
useMutation({
  mutationFn: createTenant,
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: tenantQueryKeys.all, // Invalidates all tenant queries
    })
  }
})
```

### Available Query Keys

- `tenantQueryKeys.all` - Base key for all tenant queries
- `tenantQueryKeys.lists()` - For list queries
- `tenantQueryKeys.list(filters?)` - For list queries with optional filters
- `tenantQueryKeys.details()` - For detail queries
- `tenantQueryKeys.detail(id)` - For specific tenant detail
- `tenantQueryKeys.mutations()` - For mutation-related caching

## Switching from Mock to Real API

To switch from mock API to real API:

1. Update `api/mock.ts` or create `api/client.ts` with real endpoint calls
2. Update the import in `mutations/use-create-tenant-mutation.ts`
3. No changes needed in components or hooks!

Example:
```tsx
// api/client.ts
export async function createTenantApi(data: CreateTenantRequest) {
  const response = await fetch('/api/tenants', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}
```

## Adding New Mutations

1. Create a new file in `mutations/` folder
2. Use `useMutation` from TanStack Query
3. Export from `mutations/index.ts`
4. Use in your components

## Adding New Queries

1. Create a new file in `queries/` folder
2. Use `useQuery` from TanStack Query
3. Export from `queries/index.ts`
4. Use in your components
