import { useEffect } from "react";
import { FILE_TYPES } from "@/lib/constants";
import { createFileRoute } from "@tanstack/react-router";

import { useFindReportQuery } from "@/hooks/queries/use-reports-query";
import { FileUploadProvider } from "@/contexts/file-upload-context";

import { useBreadcrumb } from "@/components/ui/breadcrumb";
import { QueryStatusWrapper } from "@/components/hocs";
import { FormSkeleton } from "@/components/skeletons";
import { UpdateReportForm } from "@/components/forms";
import { Heading, Subheading } from "@/components/headings";

export const Route = createFileRoute("/_main/reports/$reportId/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setItems } = useBreadcrumb();
  const { data, isPending, isError, refetch } = useFindReportQuery(
    Route.useParams().reportId,
  );

  useEffect(() => {
    setItems([{ title: "Reports", url: "/reports" }, { title: "Edit Report" }]);
  }, [setItems]);

  return (
    <div className="p-8">
      <QueryStatusWrapper
        isPending={isPending}
        isError={isError}
        loadingComp={<FormSkeleton withHeading={true} withSubheading={true} />}
        onRetry={refetch}
      >
        {data && (
          <div className="mx-auto flex max-w-[650px] flex-col gap-y-8 p-8">
            <div className="text-left md:text-center">
              <Heading className="text-xl font-bold md:text-3xl">
                Update report details
              </Heading>
              <Subheading className="text-muted font-mdeium text-sm md:text-base">
                Adjust report information and attachments as needed.
              </Subheading>
            </div>
            <FileUploadProvider
              folder="/sklibon-ims/reports/"
              accepted={FILE_TYPES.DOCUMENTS}
              fileInputProps={{ multiple: true }}
            >
              <UpdateReportForm />
            </FileUploadProvider>
          </div>
        )}
      </QueryStatusWrapper>
    </div>
  );
}
