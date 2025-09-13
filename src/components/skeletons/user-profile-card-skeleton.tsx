import { Skeleton } from "@/components/ui/skeleton";
import { ProfileCardUserSkeleton } from "./profile-card-user-skeleton";

export const UserProfileCardSkeleton = () => {
  return (
    <div className="mx-auto flex max-w-[640px] flex-col gap-y-4 border-0 pt-20 shadow-none md:pt-32">
      <ProfileCardUserSkeleton />
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
