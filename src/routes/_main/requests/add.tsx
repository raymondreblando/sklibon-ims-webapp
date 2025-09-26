import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { FILE_TYPES } from "@/lib/constants";
import { FileUploadProvider } from "@/contexts/file-upload-context";

import { useBreadcrumb } from "@/components/ui/breadcrumb";
import { CreateRequestForm } from "@/components/forms";
import { Heading, Subheading } from "@/components/headings";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/_main/requests/add")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setItems } = useBreadcrumb();

  useEffect(() => {
    setItems([{ title: "Requests", url: "/requests" }, { title: "Create" }]);
  }, [setItems]);

  return (
    <div className="border-input mx-auto my-4 max-w-[650px] rounded-md border-0 md:my-8 md:border">
      <div className="p-4 text-left md:px-8 md:py-6">
        <Heading className="text-lg font-bold md:text-2xl">
          Create New Request
        </Heading>
        <Subheading className="text-muted text-sm font-medium">
          Fill out the form below to submit your request for processing.
        </Subheading>
      </div>
      <Separator className="bg-input" />
      <FileUploadProvider
        folder="/sklibon-ims/requests/"
        accepted={FILE_TYPES.DOCUMENTS}
      >
        <CreateRequestForm />
      </FileUploadProvider>
    </div>
  );
}
