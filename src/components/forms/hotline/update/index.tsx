import { STATUSES } from "@/lib/constants";
import { preventNumericInput } from "@/lib/utils/utils";

import { FormInput, FormSelect, FormWrapper } from "@/components/forms";
import { useUpdateHotlineForm } from "./use-update-hotline-form";

export const UpdateHotlineForm = () => {
  const { form, onSubmit } = useUpdateHotlineForm();

  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      buttonText={{
        idle: "Update hotline",
        submitting: "Updating hotline...",
      }}
    >
      <FormInput name="name" label="Hotline name" />
      <FormInput name="abbreviation" label="Abbreviation" />
      <FormInput
        name="hotline"
        label="Hotline number"
        props={{
          onKeyDown: (event) => preventNumericInput(event),
        }}
      />
      <FormSelect
        name="status"
        label="Status"
        options={STATUSES}
        placeholder="Select status"
      />
    </FormWrapper>
  );
};
