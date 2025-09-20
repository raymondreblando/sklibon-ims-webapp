import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export const ReportViewCardSkeleton = () => {
  return (
    <div className="border-input mx-auto max-w-[640px] rounded-md border p-4 shadow-none md:p-8">
      <div>
        <Skeleton className="mb-1 h-12 w-full rounded-md md:h-14" />
        <Skeleton className="h-6 w-32 rounded-full" />
      </div>
      <Separator className="bg-input my-3" />
      <div className="flex flex-col gap-y-4">
        <Skeleton className="mb-1 h-32 w-full rounded-md" />
        <Skeleton className="mb-1 h-8 w-24 rounded-full" />
        <Skeleton className="h-12 w-full rounded-md" />
        <Skeleton className="h-12 w-full rounded-md" />
      </div>
      <Separator className="bg-input my-3" />
      <div className="flex items-center gap-x-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div>
          <Skeleton className="mb-1 h-4 w-32 rounded-full" />
          <Skeleton className="h-2 w-8 rounded-full" />
        </div>
      </div>
    </div>
  );
};
