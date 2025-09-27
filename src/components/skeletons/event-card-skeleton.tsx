import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

interface EventCardSkeletonProps {
  count: number;
}

export const EventCardSkeleton = ({ count }: EventCardSkeletonProps) => {
  return Array.from({ length: count }).map((_, index) => (
    <Card
      key={`event-card-skeleton-${index}`}
      className="border-input gap-2 overflow-hidden rounded-md border p-0 shadow-none"
    >
      <CardHeader className="block aspect-video p-0">
        <Skeleton className="h-full w-full" />
      </CardHeader>
      <Separator className="bg-input" />
      <CardContent className="space-y-4 py-4">
        <Skeleton className="h-6 w-36 rounded-full" />
        <div>
          <Skeleton className="h-4 w-16 rounded-full mb-1" />
          <Skeleton className="h-4 w-16 rounded-full" />
        </div>
        <Skeleton className="h-36 w-full rounded-md" />
      </CardContent>
      <Separator className="bg-input" />
      <CardFooter className="flex flex-wrap items-center justify-between gap-2 py-4">
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
      </CardFooter>
    </Card>
  ));
};
