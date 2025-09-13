import { Skeleton } from "@/components/ui/skeleton";

export const ProfileCardUserSkeleton = () => {
  return (
    <div className="border-input relative flex flex-col items-center justify-center gap-y-2 rounded-md border pt-20 pb-8">
      <Skeleton className="border-input absolute -top-20 left-1/2 min-h-36 min-w-36 -translate-x-1/2 rounded-full border-4" />
      <Skeleton className="h-8 w-48 rounded-full" />
      <Skeleton className="h-4 w-16 rounded-full" />
      <Skeleton className="h-4 w-32 rounded-full" />
    </div>
  );
};
