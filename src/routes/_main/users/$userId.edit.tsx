import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ProfileCardProvider } from "@/contexts/profile-card-context";

import { UpdateUserForm } from "@/components/forms";
import { useBreadcrumb } from "@/components/ui/breadcrumb";
import { useFindUserQuery } from "@/hooks/queries/use-users-query";
import { QueryStatusWrapper } from "@/components/hocs/query-status-wrapper";
import { FormSkeleton, ProfileCardUserSkeleton } from "@/components/skeletons";
import { Card, CardHeader } from "@/components/ui/card";
import { ProfileCardUser } from "@/components/cards";

export const Route = createFileRoute("/_main/users/$userId/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setItems } = useBreadcrumb();
  const { data, isPending, isError, refetch } = useFindUserQuery(
    Route.useParams().userId,
  );

  useEffect(() => {
    setItems([{ title: "Users", url: "/users" }, { title: "Edit User" }]);
  }, [setItems]);

  return (
    <QueryStatusWrapper
      isPending={isPending}
      isError={isError}
      loadingComp={
        <div className="mx-auto flex max-w-[640px] flex-col gap-y-4 border-0 pt-20 shadow-none md:pt-32">
          <ProfileCardUserSkeleton />
          <FormSkeleton withHeading={true} withSubheading={true} />
        </div>
      }
      onRetry={refetch}
    >
      {data && (
        <ProfileCardProvider user={data.data}>
          <Card className="mx-auto max-w-[640px] border-0 pt-20 shadow-none md:pt-32">
            <CardHeader className="border-input relative flex flex-col items-center justify-center gap-y-2 rounded-md border pt-20 pb-8">
              <ProfileCardUser />
            </CardHeader>
            <UpdateUserForm />
          </Card>
        </ProfileCardProvider>
      )}
    </QueryStatusWrapper>
  );
}
