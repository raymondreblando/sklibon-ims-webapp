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
    <div className="border-input mx-auto flex max-w-[650px] flex-col gap-y-6 rounded-md border p-4 md:my-8 md:p-8">
      <div className="space-y-1 text-left">
        <Heading className="text-base font-bold md:text-2xl">
          Create New Request
        </Heading>
        <Subheading className="text-muted text-xs font-medium md:text-sm">
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
