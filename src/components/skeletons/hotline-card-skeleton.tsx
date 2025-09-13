import { Skeleton } from "@/components/ui/skeleton";

export const HotlineCardSkeleton = ({ count }: { count: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={`hotline-card-${index}`}
          className="border-input flex flex-1 flex-row items-center justify-start gap-x-4 rounded-md border p-4 shadow-none"
        >
          <Skeleton className="min-h-16 min-w-16 rounded-md" />
          <div className="flex-1">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="w-10 h-10 px-4 py-2 ml-auto" />
        </div>
      ))}
    </>
  );
};
