import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export const PieChartSkeleton = () => {
  return (
    <Card className="flex flex-col gap-0 p-0">
      <CardHeader className="flex flex-wrap items-center justify-between py-4">
        <div>
          <Skeleton className="h-4 w-16 rounded-full mb-1" />
          <Skeleton className="h-3 w-24 rounded-full" />
        </div>
        <Skeleton className="h-6 w-12" />
      </CardHeader>
      <Separator className="bg-input" />
      <CardContent className="flex-1 grid place-items-center pb-0">
        <Skeleton className="h-[300px] w-[300px] rounded-full" />
      </CardContent>
    </Card>
  );
};
