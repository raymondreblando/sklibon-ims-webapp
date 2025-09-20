import { QUERY_KEYS } from "@/lib/constants/api-constants";
import { getBarangays } from "@/services/api/locations";

import { FormCombobox, FormInput, FormTextarea } from "@/components/forms";

export const ReportInfo = () => {
  return (
    <>
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
    </>
  );
};
