import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { isAuthenticated } from "@/lib/utils/auth";
import "@/lib/utils/echo";

import { AppSidebar } from "@/components/layouts/sidebar/app-sidebar";
import { BreadcrumbProvider } from "@/components/ui/breadcrumb";
import { SecondaryNav } from "@/components/layouts/secondary-nav";
import { SidebarProvider } from "@/components/ui/sidebar";

export const Route = createFileRoute("/_main")({
  component: RouteComponent,
  beforeLoad: async ({ location }) => {
    if (!isAuthenticated()) {
      throw redirect({
        to: "/",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <BreadcrumbProvider>
        <main className="bg-background w-full">
          <SecondaryNav />
          <div>
            <Outlet />
          </div>
        </main>
      </BreadcrumbProvider>
    </SidebarProvider>
  );
}
