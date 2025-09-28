import { OverviewCard, type OverviewCardProps } from "./overview-card";
import {
  CircleCheckBigIcon,
  CircleCheckIcon,
  CircleEllipsisIcon,
  CircleXIcon,
} from "lucide-react";

const overviews: Array<OverviewCardProps> = [
  {
    title: "Pending Requests",
    icon: CircleEllipsisIcon,
    iconWrapperProps: {
      className: "bg-secondary/15 text-secondary",
    },
    count: 100,
    description: "Requests that are still awaiting review or approval.",
  },
  {
    title: "Approved Requests",
    icon: CircleCheckIcon,
    iconWrapperProps: { className: "bg-primary/15 text-primary" },
    count: 150,
    description: "Requests that have been reviewed and granted approval.",
  },
  {
    title: "Completed Requests",
    icon: CircleCheckBigIcon,
    iconWrapperProps: { className: "bg-success/15 text-success" },
    count: 500,
    description: "Requests that have been fully processed and finished.",
  },
  {
    title: "Cancelled Requests",
    icon: CircleXIcon,
    iconWrapperProps: { className: "bg-destructive/15 text-destructive" },
    count: 90,
    description: "Requests that were withdrawn or declined before completion.",
  },
];

export const OverviewCardGrid = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
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
