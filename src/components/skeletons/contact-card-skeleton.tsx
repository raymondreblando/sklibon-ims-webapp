import { Skeleton } from "@/components/ui/skeleton";

export const ContactCardSkeleton = ({ count }: { count: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={`contact-card-${index}`}
          className="border-input gap-x-4 rounded-md border p-4 shadow-none md:p-6"
        >
          <div className="mb-4 flex items-center gap-x-4">
            <Skeleton className="h-14 w-14 rounded-full" />
            <div>
              <Skeleton className="mb-1 h-5 w-32 rounded-full" />
              <Skeleton className="h-4 w-20 rounded-full" />
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-md px-3 py-2">
            <Skeleton className="h-6 w-48 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        </div>
      ))}
    </>
  );
};
