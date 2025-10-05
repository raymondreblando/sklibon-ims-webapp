import { useMemo } from "react";
import { useDashboardContext } from "@/contexts/dashboard-context";
import { OverviewCard } from "./overview-card";
import {
  CircleCheckBigIcon,
  CircleCheckIcon,
  CircleEllipsisIcon,
  CircleXIcon,
} from "lucide-react";

export const OverviewCardGrid = () => {
  const { data } = useDashboardContext();

  const overviews = useMemo(() => {
    return [
      {
        title: "Pending Requests",
        icon: CircleEllipsisIcon,
        iconWrapperProps: {
          className: "bg-secondary/15 text-secondary",
        },
        count: data.overviews.pending,
        description: "Requests that are still awaiting review or approval.",
      },
      {
        title: "Approved Requests",
        icon: CircleCheckIcon,
        iconWrapperProps: { className: "bg-primary/15 text-primary" },
        count: data.overviews.approved,
        description: "Requests that have been reviewed and granted approval.",
      },
      {
        title: "Completed Requests",
        icon: CircleCheckBigIcon,
        iconWrapperProps: { className: "bg-success/15 text-success" },
        count: data.overviews.completed,
        description: "Requests that have been fully processed and finished.",
      },
      {
        title: "Cancelled Requests",
        icon: CircleXIcon,
        iconWrapperProps: { className: "bg-destructive/15 text-destructive" },
        count: data.overviews.cancelled,
        description:
          "Requests that were withdrawn or declined before completion.",
      },
    ];
  }, [data]);

  return (
    <div className="grid gap-4 lg:col-span-2 lg:grid-cols-2">
      {overviews.map((overview, index) => (
        <OverviewCard
          key={`overview-card-${index}`}
          title={overview.title}
          icon={overview.icon}
          iconWrapperProps={overview.iconWrapperProps}
          count={overview.count}
          description={overview.description}
        />
      ))}
    </div>
  );
};
