import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ProfileCardProvider } from "@/contexts/profile-card-context";

import { UpdateUserForm } from "@/components/forms";
import { useBreadcrumb } from "@/components/ui/breadcrumb";
import { useFindUserQuery } from "@/hooks/queries/use-users-query";
import { QueryStatusWrapper } from "@/components/hocs/query-status-wrapper";
import { FormSkeleton, ProfileCardUserSkeleton } from "@/components/skeletons";
import { CardHeader } from "@/components/ui/card";
import { ProfileCardUser } from "@/components/cards";
import { Heading, Subheading } from "@/components/headings";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/_main/users/$userId/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setItems } = useBreadcrumb();
  const { data, isPending, isError, refetch } = useFindUserQuery(
    Route.useParams().userId,
  );

  useEffect(() => {
    setItems([{ title: "SK Members", url: "/users" }, { title: "Edit" }]);
  }, [setItems]);

  return (
    <QueryStatusWrapper
      isPending={isPending}
      isError={isError}
      loadingComp={
        <div className="border-input mx-auto my-4 max-w-[640px] rounded-md border-0 md:my-8 md:border">
          <ProfileCardUserSkeleton />
          <FormSkeleton withHeading={true} withSubheading={true} />
        </div>
      }
      onRetry={refetch}
    >
      {data && (
        <ProfileCardProvider user={data.data}>
          <div className="border-input mx-auto my-4 max-w-[640px] rounded-md border-0 md:my-8 md:border">
            <div className="p-4 text-left md:px-8 md:py-6">
              <Heading className="text-xl font-bold md:text-3xl">
                Edit SK Member Account
              </Heading>
              <Subheading className="text-muted text-sm font-medium md:text-base">
                Fill in the required details to update the sk member account.
              </Subheading>
            </div>
            <Separator className="bg-input" />
            <CardHeader className="flex flex-col items-center justify-center py-6 md:py-8">
              <ProfileCardUser />
            </CardHeader>
            <Separator className="bg-input" />
            <UpdateUserForm />
          </div>
        </ProfileCardProvider>
      )}
    </QueryStatusWrapper>
  );
}
