import { Skeleton } from "@/components/ui/skeleton";

export const ChatInputSkeleton = () => {
  return (
    <div className="flex items-center gap-x-4 px-6 py-4">
      <Skeleton className="min-h-16 w-full rounded-md" />
      <Skeleton className="min-h-16 w-full min-w-16 flex-1 rounded-md" />
    </div>
  );
};
