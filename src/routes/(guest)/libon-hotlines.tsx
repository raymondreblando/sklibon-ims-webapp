import { createFileRoute, Link } from "@tanstack/react-router";

import { AuthBranding } from "@/components/layouts/auth/auth-branding";
import { Separator } from "@/components/ui/separator";
import { HeadingWithWrapper } from "@/components/headings";
import { HotlineCard } from "@/components/cards";
import { useHotlinesQuery } from "@/hooks/queries/use-hotlines-query";
import { QueryStatusWrapper } from "@/components/hocs/query-status-wrapper";
import { HotlineCardSkeleton } from "@/components/skeletons";

export const Route = createFileRoute("/(guest)/libon-hotlines")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isPending, isError, data, refetch } = useHotlinesQuery();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-[min(100%,650px)] px-4 py-8">
        <AuthBranding />
        <Separator className="my-8" />
        <div className="flex flex-1 flex-col gap-y-8">
          <HeadingWithWrapper
            heading="Libon Hotlines"
            subheading="Important numbers you can call in case of emergency."
          />
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
          <p className="text-muted text-center text-sm font-medium md:text-base">
            <Link
              to="/"
              search={{ redirect: "" }}
              className="text-primary font-semibold underline"
            >
              Go back to login page
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
