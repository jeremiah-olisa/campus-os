import { AppSidebar } from "@/components/layout/dashboard/app-sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <AppSidebar />
      <main className="flex-1 p-6 sm:p-8 lg:p-10">
        <div className="max-w-4xl mx-auto">
          <Outlet />
        </div>
      </main>
    </>
  );
}
