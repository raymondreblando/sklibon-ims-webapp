import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

interface ReportCardSkeletonProps {
  count: number;
}

export const ReportCardSkeleton = ({ count }: ReportCardSkeletonProps) => {
  return Array.from({ length: count }).map((_, index) => (
    <div
      key={`report-card-skeleton-${index}`}
      className="border-input rounded-md border p-4"
    >
      <div className="flex gap-4">
        <Skeleton className="h-12 w-12 rounded-md" />
        <div>
          <Skeleton className="mb-1 h-6 w-32 rounded-full" />
          <Skeleton className="h-4 w-24 rounded-full" />
        </div>
      </div>
      <Separator className="bg-input my-3" />
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-x-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div>
            <Skeleton className="mb-1 h-4 w-24 rounded-full" />
            <Skeleton className="h-2 w-24 rounded-full" />
          </div>
        </div>
        <div className="text-muted flex items-center gap-x-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={`report-card-action-${index}`}
              className="h-4 w-4 rounded-md"
            />
          ))}
        </div>
      </div>
    </div>
  ));
};
