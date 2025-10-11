import { Skeleton } from "@/components/ui/skeleton";

export const ChatSkeleton = ({ count }: { count: number }) => {
  return Array.from({ length: count }).map((_, index) => (
    <div
      key={`chat-skeleton-${index}`}
      className="hover:bg-muted/5 border-b-input flex cursor-pointer gap-x-4 border-b px-6 py-3 transition-colors last:border-0"
    >
      <div className="relative">
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>
      <div>
        <Skeleton className="mb-1 h-4 w-20 rounded-full" />
        <Skeleton className="mb-1 h-2 w-20 rounded-full" />
        <Skeleton className="h-2 w-20 rounded-full" />
      </div>
    </div>
  ));
};
