import { Skeleton } from "@/components/ui/skeleton";

export const ChatSkeleton = ({ count }: { count: number }) => {
  return Array.from({ length: count }).map((_, index) => (
    <div
      key={`chat-skeleton-${index}`}
      className="hover:bg-muted/5 border-b-input flex cursor-pointer items-center gap-x-4 border-b px-6 py-3 transition-colors last:border-0"
    >
      <div className="relative">
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>
      <div className="flex-1">
        <Skeleton className="mb-1 h-4 w-20 rounded-full" />
        <Skeleton className="mb-1 h-4 w-full rounded-full" />
      </div>
    </div>
  ));
};
