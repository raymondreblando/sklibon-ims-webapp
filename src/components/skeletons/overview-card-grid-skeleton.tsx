import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const OverviewCardGridSkeleton = () => {
  return (
    <div className="grid gap-4 lg:col-span-2 lg:grid-cols-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card
          key={`overview-card-skeleton-${index}`}
          className="gap-0 space-y-3 p-8"
        >
          <div className="flex flex-wrap-reverse items-center justify-between">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-11 w-11 place-items-center rounded-full" />
          </div>
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-4 w-32" />
        </Card>
      ))}
    </div>
  );
};
