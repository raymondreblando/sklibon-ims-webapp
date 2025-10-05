import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export const UpcomingEventSkeleton = () => {
  return (
    <Card className="gap-0 p-0">
      <CardHeader className="flex flex-wrap items-center justify-between py-4">
        <div>
          <Skeleton className="h-4 w-16 rounded-full mb-1" />
          <Skeleton className="h-3 w-24 rounded-full" />
        </div>
        <Skeleton className="h-6 w-12" />
      </CardHeader>
      <Separator className="bg-input" />
      <CardContent className="p-0">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={`upcoming-event-${index}`}
            className="flex flex-wrap items-center justify-between gap-4 px-6 py-3"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-x-2">
                <Skeleton className="h-8 w-8 rounded-md" />
                <div>
                  <Skeleton className="h-5 w-32 rounded-full mb-1" />
                  <Skeleton className="h-5 w-24 rounded-full" />
                </div>
              </div>
            </div>
            <div className="space-y-0.5 md:text-right">
              <Skeleton className="h-3 w-8 rounded-full" />
              <Skeleton className="h-4 w-8 rounded-full" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
