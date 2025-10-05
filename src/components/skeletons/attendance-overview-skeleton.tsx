import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTableSkeleton } from "./data-table-skeleton";

export const AttendanceOverviewSkeleton = () => {
  return (
    <Card className="w-full gap-0 overflow-hidden p-0 md:col-span-2">
      <CardHeader className="flex flex-wrap items-center justify-between py-4">
        <Skeleton className="h-4 w-16 rounded-full" />
        <Skeleton className="h-6 w-12" />
      </CardHeader>
      <Separator className="bg-input" />
      <CardContent className="p-0 pb-2">
        <DataTableSkeleton columnLength={5} />
      </CardContent>
    </Card>
  );
};
