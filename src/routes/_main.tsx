import { createFileRoute, Outlet } from "@tanstack/react-router";

import { AppSidebar } from "@/components/layouts/sidebar/app-sidebar";
import { BreadcrumbProvider } from "@/components/ui/breadcrumb";
import { SecondaryNav } from "@/components/layouts/secondary-nav";
import { SidebarProvider } from "@/components/ui/sidebar";

export const Route = createFileRoute("/_main")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <BreadcrumbProvider>
        <main className="w-full">
          <SecondaryNav />
          <Outlet />
        </main>
      </BreadcrumbProvider>
    </SidebarProvider>
  );
}
