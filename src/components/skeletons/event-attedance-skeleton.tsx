import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

interface EventAttedanceSkeletonProps {
  count: number;
}

export const EventAttedanceSkeleton = ({
  count,
}: EventAttedanceSkeletonProps) => {
  return (
    <Card className="border-input mx-auto w-[min(100%,750px)] gap-0 overflow-hidden rounded-md border p-0 shadow-none">
      <CardHeader className="py-4">
        <Skeleton className="h-4 w-28" />
      </CardHeader>
      <Separator className="bg-input" />
      <CardContent className="space-y-4 p-6">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={`event-aatendance-skeleton-${index}`}
            className="flex w-full flex-wrap items-center justify-between gap-3"
          >
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-md" />
              <div className="flex items-center gap-x-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div>
                  <Skeleton className="mb-1 h-4 w-24 rounded-full" />
                  <Skeleton className="h-2 w-24 rounded-full" />
                </div>
              </div>
            </div>
            <div className="space-y-0.5">
              <Skeleton className="mb-1 h-4 w-24 rounded-full" />
              <Skeleton className="h-2 w-24 rounded-full" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
