import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FILE_TYPES } from "@/lib/constants";

import { useFindGalleryQuery } from "@/hooks/queries/use-galleries-query";
import { FileUploadProvider } from "@/contexts/file-upload-context";

import { useBreadcrumb } from "@/components/ui/breadcrumb";
import { QueryStatusWrapper } from "@/components/hocs";
import { FormSkeleton } from "@/components/skeletons";
import { Heading, Subheading } from "@/components/headings";
import { UpdateGalleryForm } from "@/components/forms";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/_main/galleries/$galleryId/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setItems } = useBreadcrumb();
  const { data, isPending, isError, refetch } = useFindGalleryQuery(
    Route.useParams().galleryId,
  );

  useEffect(() => {
    setItems([{ title: "Galleries", url: "/galleries" }, { title: "Edit" }]);
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
              Edit Gallery Details
            </Heading>
            <Subheading className="text-muted text-sm font-medium">
              Fill in the details below to update gallery details.
            </Subheading>
          </div>
          <Separator className="bg-input" />
          <FileUploadProvider
            folder="/sklibon-ims/galleries/"
            accepted={FILE_TYPES.IMAGES}
            fileInputProps={{ multiple: true }}
          >
            <UpdateGalleryForm />
          </FileUploadProvider>
        </div>
      )}
    </QueryStatusWrapper>
  );
}
