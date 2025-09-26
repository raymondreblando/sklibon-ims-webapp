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
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/_main/reports/$reportId/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setItems } = useBreadcrumb();
  const { data, isPending, isError, refetch } = useFindReportQuery(
    Route.useParams().reportId,
  );

  useEffect(() => {
    setItems([{ title: "Reports", url: "/reports" }, { title: "Edit" }]);
  }, [setItems]);

  return (
    <QueryStatusWrapper
      isPending={isPending}
      isError={isError}
      loadingComp={<FormSkeleton withHeading={true} withSubheading={true} />}
      onRetry={refetch}
    >
      {data && (
        <div className="border-input mx-auto my-4 max-w-[650px] rounded-md border-0 md:my-8 md:border">
          <div className="p-4 text-left md:px-8 md:py-6">
            <Heading className="text-lg font-bold md:text-2xl">
              Edit Report Details
            </Heading>
            <Subheading className="text-muted text-sm font-medium">
              Adjust report information and attachments as needed.
            </Subheading>
          </div>
          <Separator className="bg-input" />
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
  );
}
