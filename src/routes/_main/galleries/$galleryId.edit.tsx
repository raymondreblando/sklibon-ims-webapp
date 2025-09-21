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

export const Route = createFileRoute("/_main/galleries/$galleryId/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setItems } = useBreadcrumb();
  const { data, isPending, isError, refetch } = useFindGalleryQuery(
    Route.useParams().galleryId,
  );

  useEffect(() => {
    setItems([
      { title: "Galleries", url: "/galleries" },
      { title: "Edit Gallery" },
    ]);
  }, [setItems]);

  return (
    <div className="p-4 md:p-8">
      <QueryStatusWrapper
        isPending={isPending}
        isError={isError}
        loadingComp={<FormSkeleton withHeading={true} withSubheading={true} />}
        onRetry={refetch}
      >
        {data && (
          <div className="mx-auto flex max-w-[650px] flex-col gap-y-8  p-4 md:p-8">
            <div className="text-left md:text-center">
              <Heading className="text-xl font-bold md:text-3xl">
                Update gallery details
              </Heading>
              <Subheading className="text-muted font-mdeium text-sm md:text-base">
                Fill in the details below to update gallery details.
              </Subheading>
            </div>
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
    </div>
  );
}
