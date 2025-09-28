import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { FILE_TYPES } from "@/lib/constants";
import { FileUploadProvider } from "@/contexts/file-upload-context";
import { useFindEventQuery } from "@/hooks/queries/use-events-query";

import { useBreadcrumb } from "@/components/ui/breadcrumb";
import { UpdateEventForm } from "@/components/forms";
import { QueryStatusWrapper } from "@/components/hocs";
import { FormSkeleton } from "@/components/skeletons";
import { Heading, Subheading } from "@/components/headings";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/_main/events/$eventId/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setItems } = useBreadcrumb();
  const { data, isPending, isError, refetch } = useFindEventQuery(
    Route.useParams().eventId,
  );

  useEffect(() => {
    setItems([{ title: "Events", url: "/events" }, { title: "Edit" }]);
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
              Edit Event Information
            </Heading>
            <Subheading className="text-muted text-sm font-medium">
              Fill out the form below to update the event information.
            </Subheading>
          </div>
          <Separator className="bg-input" />
          <FileUploadProvider
            folder="/sklibon-ims/events/"
            accepted={FILE_TYPES.IMAGES}
          >
            <UpdateEventForm />
          </FileUploadProvider>
        </div>
      )}
    </QueryStatusWrapper>
  );
}
