import { SidebarProvider } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

// Create a client for the app to use
const queryClient = new QueryClient();

const RootLayout = () => (
  <SidebarProvider>
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </QueryClientProvider>
  </SidebarProvider>
);

export const Route = createRootRoute({ component: RootLayout });
