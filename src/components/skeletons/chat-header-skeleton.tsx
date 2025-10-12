import { Skeleton } from "@/components/ui/skeleton";

export const ChatHeaderSkeleton = () => {
  return (
    <div className="px-6 py-4">
      <div className="flex items-center gap-x-4">
        <div className="relative">
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>
        <div>
          <Skeleton className="mb-1 h-4 w-32 rounded-full" />
          <Skeleton className="h-3 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
};
