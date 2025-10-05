import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { ROLES } from "@/lib/constants";
import { getAuthUser } from "@/lib/utils/auth";

import { useBreadcrumb } from "@/components/ui/breadcrumb";
import { QueryStatusWrapper } from "@/components/hocs";
import { useDashboardQuery } from "@/hooks/queries/use-dashboard-query";
import { DashboardProvider } from "@/contexts/dashboard-context";
import {
  AttendanceChart,
  AttendanceOverview,
  MemberChart,
  OverviewCardGrid,
  RequestChart,
  UpcomingEvents,
} from "@/components/layouts/dashboard";
import {
  AttendanceOverviewSkeleton,
  LineChartSkeleton,
  OverviewCardGridSkeleton,
  PieChartSkeleton,
  UpcomingEventSkeleton,
} from "@/components/skeletons";

export const Route = createFileRoute("/_main/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const role = getAuthUser()?.role.role;
  const { data, isPending, isError, refetch } = useDashboardQuery();
  const { setItems } = useBreadcrumb();

  useEffect(() => {
    setItems([{ title: "Dashboard" }]);
  }, [setItems]);

  return (
    <div className="grid gap-4 p-4 lg:grid-cols-3 lg:p-8">
      <QueryStatusWrapper
        isPending={isPending}
        isError={isError}
        loadingComp={
          <>
            <OverviewCardGridSkeleton />
            <UpcomingEventSkeleton />
            <LineChartSkeleton />
            <PieChartSkeleton />
            <PieChartSkeleton />
            <AttendanceOverviewSkeleton />
          </>
        }
        onRetry={refetch}
      >
        {data && (
          <DashboardProvider data={data.data}>
            <OverviewCardGrid />
            <UpcomingEvents />
            {role !== ROLES.USER && (
              <>
                <RequestChart />
                <MemberChart />
                <AttendanceChart />
              </>
            )}
            <AttendanceOverview />
          </DashboardProvider>
        )}
      </QueryStatusWrapper>
    </div>
  );
}
