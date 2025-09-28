import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { ROLES } from "@/lib/constants";
import { getAuthUser } from "@/lib/utils/auth";

import { useBreadcrumb } from "@/components/ui/breadcrumb";
import {
  AttendanceOverview,
  OverviewCardGrid,
  RequestChart,
  UpcomingEvents,
} from "@/components/layouts/dashboard";

export const Route = createFileRoute("/_main/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const role = getAuthUser()?.role.role;
  const { setItems } = useBreadcrumb();

  useEffect(() => {
    setItems([{ title: "Dashboard" }]);
  }, [setItems]);

  return (
    <div className="grid gap-4 p-4 lg:grid-cols-[1fr_minmax(300,600px)] lg:p-8">
      <OverviewCardGrid />
      <UpcomingEvents />
      {role !== ROLES.USER && (
        <div className="lg:col-span-2">
          <RequestChart />
        </div>
      )}
      <AttendanceOverview />
    </div>
  );
}
