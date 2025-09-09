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
          <div>
            <Skeleton className="h-10 w-22" />
            <Skeleton className="h-8 w-16" />
          </div>
          <Skeleton className="h-10 px-4 py-2" />
        </div>
      ))}
    </>
  );
};
