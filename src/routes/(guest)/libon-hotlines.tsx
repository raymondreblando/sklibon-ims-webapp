import { createFileRoute } from "@tanstack/react-router";
import { useHotlinesQuery } from "@/hooks/queries/use-hotlines-query";

import { HeadingWithWrapper } from "@/components/headings";
import { HotlineCard } from "@/components/cards";
import { QueryStatusWrapper } from "@/components/hocs/query-status-wrapper";
import { HotlineCardSkeleton } from "@/components/skeletons";
import { AuthWrapper, RedirectLink } from "@/components/layouts/auth";

export const Route = createFileRoute("/(guest)/libon-hotlines")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isPending, isError, data, refetch } = useHotlinesQuery();

  return (
    <AuthWrapper className="w-[min(100%,650px)]">
      <HeadingWithWrapper
        heading="Libon Hotlines"
        subheading="Important numbers you can call in case of emergency."
      />
      <div className="flex flex-col gap-y-4">
        <QueryStatusWrapper
          isPending={isPending}
          isError={isError}
          loadingComp={<HotlineCardSkeleton count={3} />}
          onRetry={refetch}
        >
          {data &&
            data
              .filter((item) => item.status === "active")
              .map((hotline) => (
                <HotlineCard
                  key={hotline.id}
                  name={hotline.name}
                  hotline={hotline.hotline}
                />
              ))}
        </QueryStatusWrapper>
      </div>
      <RedirectLink linkProps={{ to: "/" }}>Go to login page</RedirectLink>
    </AuthWrapper>
  );
}
