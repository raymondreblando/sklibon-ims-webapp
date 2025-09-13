import { Skeleton } from "@/components/ui/skeleton";

export const UserProfileCardSkeleton = () => {
  return (
    <div className="mx-auto flex max-w-[640px] flex-col gap-y-4 border-0 pt-20 shadow-none md:pt-32">
      <div className="border-input relative flex flex-col items-center justify-center gap-y-2 rounded-md border pt-20 pb-8">
        <Skeleton className="border-input absolute -top-20 left-1/2 min-h-36 min-w-36 -translate-x-1/2 rounded-full border-4" />
        <Skeleton className="h-8 w-48 rounded-full" />
        <Skeleton className="h-4 w-16 rounded-full" />
        <Skeleton className="h-4 w-32 rounded-full" />
      </div>
      <div className="flex flex-col gap-y-4 px-0">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={`skeleton-header-${index}`}
            className="border-input rounded-md border"
          >
            <div className="border-input border-b px-6 py-4">
              <Skeleton className="h-4 w-20 rounded-full" />
            </div>
            <div className="grid gap-6 p-6 md:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={`skeleton-info-${index}`} className="">
                  <Skeleton className="mb-1 h-4 w-20 rounded-full" />
                  <Skeleton className="h-4 w-32 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
