import { useEffect } from "react";

import { useBreadcrumb } from "@/components/ui/breadcrumb";
import { createFileRoute } from "@tanstack/react-router";
import { useFindUserQuery } from "@/hooks/queries/use-users-query";
import { ProfileCard } from "@/components/cards/user-profile-card";
import { ProfileCardProvider } from "@/contexts/profile-card-context";
import { QueryStatusWrapper } from "@/components/hocs/query-status-wrapper";
import { UserProfileCardSkeleton } from "@/components/skeletons";

export const Route = createFileRoute("/_main/users/$userId/view")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setItems } = useBreadcrumb();
  const { data, isPending, isError, refetch } = useFindUserQuery(
    Route.useParams().userId,
  );

  useEffect(() => {
    setItems([
      { title: "SK Members", url: "/users" },
      { title: "Member Profile" },
    ]);
  }, [setItems]);

  return (
    <QueryStatusWrapper
      isPending={isPending}
      isError={isError}
      loadingComp={<UserProfileCardSkeleton />}
      onRetry={refetch}
    >
      {data && (
        <ProfileCardProvider user={data.data}>
          <ProfileCard />
        </ProfileCardProvider>
      )}
    </QueryStatusWrapper>
  );
}
