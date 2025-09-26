import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { FILE_TYPES } from "@/lib/constants";
import { FileUploadProvider } from "@/contexts/file-upload-context";

import { useBreadcrumb } from "@/components/ui/breadcrumb";
import { Heading, Subheading } from "@/components/headings";
import { CreateGalleryForm } from "@/components/forms";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/_main/galleries/add")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setItems } = useBreadcrumb();

  useEffect(() => {
    setItems([{ title: "Galleries", url: "/galleries" }, { title: "Create" }]);
  }, [setItems]);

  return (
    <div className="border-input mx-auto my-4 max-w-[650px] rounded-md border-0 md:my-8 md:border">
      <div className="p-4 text-left md:px-8 md:py-6">
        <Heading className="text-lg font-bold md:text-2xl">
          Create New Gallery
        </Heading>
        <Subheading className="text-muted text-sm font-medium">
          Fill in the details below to create a new image gallery.
        </Subheading>
      </div>
      <Separator className="bg-input" />
      <FileUploadProvider
        folder="/sklibon-ims/galleries/"
        accepted={FILE_TYPES.IMAGES}
        fileInputProps={{ multiple: true }}
      >
        <CreateGalleryForm />
      </FileUploadProvider>
    </div>
  );
}
