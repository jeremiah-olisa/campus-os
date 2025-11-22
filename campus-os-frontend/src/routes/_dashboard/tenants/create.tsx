import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/dashboard/page-header";
import {
  useCreateTenant,
  CreateTenantForm,
  TenantSuccessAlert,
  ErrorAlert,
} from "@/features/tenants";

export const Route = createFileRoute("/_dashboard/tenants/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const { form, onSubmit, isLoading, successData, error, generateSlug } =
    useCreateTenant();

  return (
    <div className="max-w-4xl flex flex-col gap-4 mx-auto">
      {/* <!-- PageHeading --> */}
      <PageHeader
        title="Create New Tenant"
        description="Fill in the details below to set up a new school profile."
      />

      {/* <!-- Error Alert --> */}
      <ErrorAlert error={error} />

      {/* <!-- Success Alert Section --> */}
      {successData && (
        <TenantSuccessAlert
          tenantName={successData.name}
          tenantId={successData.id}
          invitationLink={successData.invitationLink}
        />
      )}

      {/* <!-- Form Section --> */}
      <CreateTenantForm
        form={form}
        onSubmit={onSubmit}
        isLoading={isLoading}
        onGenerateSlug={generateSlug}
      />
    </div>
  );
}
