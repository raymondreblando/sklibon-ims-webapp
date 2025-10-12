import { useQueryClient } from "@tanstack/react-query";
import { useEcho, useEchoPublic } from "@laravel/echo-react";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { getAuthUser } from "@/lib/utils/auth";
import { isAuthenticated } from "@/lib/utils/auth";
import { QUERY_KEYS } from "@/lib/constants/api-constants";
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
  const queryClient = useQueryClient();
  const user = getAuthUser();

  useEcho(`notification.user.${user?.id}`, ".notification.created", () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NOTIFICATIONS] });
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REQUESTS] });
  });

  useEcho(
    `notification.barangay.${user?.info.barangay.id}`,
    ".notification.created",
    () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NOTIFICATIONS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REQUESTS] });
    },
  );

  useEchoPublic("notification.announcements", ".notification.created", () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NOTIFICATIONS] });
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.EVENTS] });
  });

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
