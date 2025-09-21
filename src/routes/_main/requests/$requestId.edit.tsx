import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { FILE_TYPES } from "@/lib/constants";
import { FileUploadProvider } from "@/contexts/file-upload-context";
import { useFindRequestQuery } from "@/hooks/queries/use-requests-query";

import { useBreadcrumb } from "@/components/ui/breadcrumb";
import { UpdateRequestForm } from "@/components/forms";
import { Heading, Subheading } from "@/components/headings";
import { QueryStatusWrapper } from "@/components/hocs";
import { Separator } from "@/components/ui/separator";
import { FormSkeleton } from "@/components/skeletons";

export const Route = createFileRoute("/_main/requests/$requestId/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setItems } = useBreadcrumb();
  const { data, isPending, isError, refetch } = useFindRequestQuery(
    Route.useParams().requestId,
  );

  useEffect(() => {
    setItems([{ title: "Requests", url: "/requests" }, { title: "Edit" }]);
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
              Edit Request Information
            </Heading>
            <Subheading className="text-muted text-sm font-medium">
              Fill out the form below to update the request information.
            </Subheading>
          </div>
          <Separator className="bg-input" />
          <FileUploadProvider
            folder="/sklibon-ims/requests/"
            accepted={FILE_TYPES.DOCUMENTS}
          >
            <UpdateRequestForm />
          </FileUploadProvider>
        </div>
      )}
    </QueryStatusWrapper>
  );
}
