import { useCreateReportForm } from "./use-create-report-form";
import { QUERY_KEYS } from "@/lib/constants/api-constants";
import { getBarangays } from "@/services/api/locations";

import {
  FormCombobox,
  FormInput,
  FormTextarea,
  FormWrapper,
} from "@/components/forms";
import { FileUpload } from "@/components/upload";
import { FormField } from "@/components/ui/form";

export const CreateReportForm = () => {
  const { form, onSubmit } = useCreateReportForm();

  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      buttonText={{
        idle: "Create report",
        submitting: "Creating report...",
      }}
    >
      <FormCombobox
        popoverContentClassname=""
        name="barangay_id"
        label="Barangay"
        placeholder="Select a barangay"
        resource="barangays"
        commandPlaceholder="Search barangays..."
        queryKey={[QUERY_KEYS.BARANGAYS]}
        queryFn={getBarangays}
        labelKey="name"
        valueKey="id"
      />
      <FormInput name="subject" label="Subject" />
      <FormTextarea name="description" label="Description" />

      <FormField
        control={form.control}
        name="hasSelectedFile"
        render={({ fieldState }) => <FileUpload formError={fieldState.error} />}
      />
    </FormWrapper>
  );
};
