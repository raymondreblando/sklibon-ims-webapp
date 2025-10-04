import { Skeleton } from "@/components/ui/skeleton";

export const EventCalendarSkeleton = () => {
  return (
    <div className="border-input space-y-4 rounded-md border p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-24" />
        </div>
        <div className="flex items-center gap-x-4">
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="min-h-[calc(100vh-330px)] w-full" />
      </div>
    </div>
  );
};
