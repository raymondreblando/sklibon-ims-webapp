import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FILE_TYPES } from "@/lib/constants";
import { FileUploadProvider } from "@/contexts/file-upload-context";

import { useBreadcrumb } from "@/components/ui/breadcrumb";
import { Heading, Subheading } from "@/components/headings";
import { CreateReportForm } from "@/components/forms";

export const Route = createFileRoute("/_main/reports/add")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setItems } = useBreadcrumb();

  useEffect(() => {
    setItems([
      { title: "Reports", url: "/reports" },
      { title: "Create report" },
    ]);
  }, [setItems]);

  return (
    <div className="mx-auto flex max-w-[650px] flex-col gap-y-8 p-8">
      <div className="text-left md:text-center">
        <Heading className="text-xl font-bold md:text-3xl">
          Create new report
        </Heading>
        <Subheading className="text-muted font-mdeium text-sm md:text-base">
          Fill in the details below to generate and submit a new report.
        </Subheading>
      </div>
      <FileUploadProvider
        folder="/sklibon-ims/reports/"
        accepted={FILE_TYPES.DOCUMENTS}
      >
        <CreateReportForm />
      </FileUploadProvider>
    </div>
  );
}
