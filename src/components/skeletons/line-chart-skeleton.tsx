import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const LineChartSkeleton = () => {
  return (
    <Card className="pt-0 lg:col-span-2 gap-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <Skeleton className="h-4 w-16 rounded-full" />
          <Skeleton className="h-3 w-24 rounded-full" />
        </div>
        <Skeleton className="h-6 w-12" />
      </CardHeader>
      <CardContent className="px-2 sm:px-6 sm:pt-6">
        <Skeleton className="min-h-[274px] w-full rounded-md" />
      </CardContent>
    </Card>
  );
};
