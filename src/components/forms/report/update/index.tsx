import { useUpdateReportForm } from "./use-update-report-form";

import { FormWrapper } from "@/components/forms";
import { ReportInfo } from "./report-info";
import { Attachments } from "./attachments";

export const UpdateReportForm = () => {
  const { form, onSubmit } = useUpdateReportForm();

  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      buttonText={{
        idle: "Update report",
        submitting: "Updating report...",
      }}
      formProps={{ className: "p-4 md:px-8 md:py-5" }}
    >
      <ReportInfo />
      <Attachments />
    </FormWrapper>
  );
};
