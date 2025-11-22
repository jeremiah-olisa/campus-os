import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTenantSchema } from "@/features/tenants/schema";
import { useCreateTenantMutation } from "@/features/tenants/mutations";
import type { CreateTenantFormValues } from "@/features/tenants/schema";

export function useCreateTenant() {
  const mutation = useCreateTenantMutation();

  const form = useForm<CreateTenantFormValues>({
    resolver: zodResolver(createTenantSchema),
    defaultValues: {
      tenantName: "",
      tenantSlug: "",
      primaryEmail: "",
    },
  });

  const onSubmit = async (data: CreateTenantFormValues) => {
    await mutation.mutateAsync(data);
    // Form reset is handled by user if needed
    // You can also reset on success in the mutation callbacks
  };

  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "")
      .replace(/-+/g, "-");
  };

  return {
    form,
    onSubmit,
    // TanStack Query managed states
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    successData: mutation.data,
    // Helper function
    generateSlug,
  };
}
