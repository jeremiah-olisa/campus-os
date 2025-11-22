import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RotateCcw, Plus } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import type { CreateTenantFormValues } from "@/features/tenants/schema";

interface CreateTenantFormProps {
  form: UseFormReturn<CreateTenantFormValues>;
  onSubmit: (data: CreateTenantFormValues) => Promise<void>;
  isLoading?: boolean;
  onGenerateSlug?: (name: string) => string;
}

export function CreateTenantForm({
  form,
  onSubmit,
  isLoading = false,
  onGenerateSlug,
}: CreateTenantFormProps) {
  const handleGenerateSlug = () => {
    const tenantName = form.getValues("tenantName");
    if (tenantName && onGenerateSlug) {
      const slug = onGenerateSlug(tenantName);
      form.setValue("tenantSlug", slug);
    }
  };

  return (
    <div className="bg-white dark:bg-[#1C2534] rounded-xl shadow-sm p-6 sm:p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* <!-- Tenant Name --> */}
          <FormField
            control={form.control}
            name="tenantName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tenant Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Springfield Elementary School"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* <!-- Tenant Slug --> */}
          <FormField
            control={form.control}
            name="tenantSlug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tenant Slug</FormLabel>
                <div className="flex w-full gap-2">
                  <FormControl className="flex-1">
                    <Input
                      placeholder="e.g., springfield-elementary"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    title="Generate Slug"
                    onClick={handleGenerateSlug}
                    disabled={isLoading}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
                <FormDescription>
                  Used in the URL: your-school-name.lms.com
                </FormDescription>
              </FormItem>
            )}
          />

          {/* <!-- Primary Contact Email --> */}
          <FormField
            control={form.control}
            name="primaryEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Contact Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., principal@springfield.edu"
                    type="email"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* <!-- Actions --> */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button variant="outline" type="button" disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="gap-2">
              {isLoading ? (
                <>
                  <span className="animate-spin">⚙️</span>
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Create Tenant
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
