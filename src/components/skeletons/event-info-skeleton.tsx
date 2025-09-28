import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export const EventInfoSkeleton = () => {
  return (
    <Card className="border-input mx-auto w-[min(100%,750px)] gap-0 overflow-hidden rounded-md border p-0 shadow-none">
      <CardHeader className="block aspect-video p-0">
        <Skeleton className="h-full w-full" />
      </CardHeader>
      <Separator className="bg-input" />
      <CardContent className="p-0">
        <div className="space-y-4 p-6">
          <Skeleton className="h-6 w-36 rounded-full" />
          <Skeleton className="h-5 w-36 rounded-md" />
        </div>
        <Separator className="bg-input" />
        <div className="space-y-4 p-6">
          <div className="flex flex-wrap items-center justify-between">
            <Skeleton className="h-4 w-16 rounded-full" />
            <Skeleton className="h-4 w-16 rounded-full" />
          </div>
          <Skeleton className="h-36 w-full rounded-md" />
        </div>
      </CardContent>
      <Separator className="bg-input" />
      <CardFooter className="p-0">
        <div className="flex items-center gap-x-2 p-6">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div>
            <Skeleton className="mb-1 h-4 w-24 rounded-full" />
            <Skeleton className="h-2 w-24 rounded-full" />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
