import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

interface GalleryCardSkeletonProps {
  count: number;
}

export const GalleryCardSkeleton = ({ count }: GalleryCardSkeletonProps) => {
  return Array.from({ length: count }).map((_, index) => (
    <div
      key={`gallery-card-skeleton-${index}`}
      className="block border-0 p-1 shadow-none"
    >
      <div className="grid min-h-40 grid-cols-3 grid-rows-2 gap-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton
            key={`gallery-card-image-${index}`}
            className="col-span-1 row-span-1 rounded-md nth-[2]:col-span-2 nth-[2]:row-span-2"
          />
        ))}
      </div>
      <div className="py-2">
        <Skeleton className="mb-1 h-5 w-36 rounded-full" />
        <Skeleton className="h-4 w-24 rounded-full" />
      </div>
      <Separator className="bg-input my-2" />
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-x-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div>
            <Skeleton className="mb-1 h-4 w-24 rounded-full" />
            <Skeleton className="h-2 w-24 rounded-full" />
          </div>
        </div>
        <div className="text-muted flex items-center gap-x-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={`gallery-card-action-${index}`}
              className="h-4 w-4 rounded-md"
            />
          ))}
        </div>
      </div>
    </div>
  ));
};
