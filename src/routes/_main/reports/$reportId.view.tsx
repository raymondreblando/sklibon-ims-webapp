import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useFindReportQuery } from "@/hooks/queries/use-reports-query";

import { useBreadcrumb } from "@/components/ui/breadcrumb";
import { QueryStatusWrapper } from "@/components/hocs";
import { ReportViewCardSkeleton } from "@/components/skeletons";
import { ReportViewCard } from "@/components/cards/report-view-card";

export const Route = createFileRoute("/_main/reports/$reportId/view")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setItems } = useBreadcrumb();
  const { data, isPending, isError, refetch } = useFindReportQuery(
    Route.useParams().reportId,
  );

  useEffect(() => {
    setItems([{ title: "Reports", url: "/reports" }, { title: "View" }]);
  }, [setItems]);

  return (
    <QueryStatusWrapper
      isPending={isPending}
      isError={isError}
      loadingComp={<ReportViewCardSkeleton />}
      onRetry={refetch}
    >
      {data && (
        <div className="p-4 md:p-8">
          <ReportViewCard
            title={data.subject}
            description={data.description}
            dateCreated={data.createdAt}
            uploader={{
              firstname: data.uploader.info.firstname,
              profile: data.uploader.profile,
            }}
            attachments={data.attachments}
          />
        </div>
      )}
    </QueryStatusWrapper>
  );
}
