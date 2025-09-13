import { preventNumericInput } from "@/lib/utils/utils";

import { FormInput, FormWrapper } from "@/components/forms";
import { useCreateHotlineForm } from "./use-create-hotline-form";

export const CreateHotlineForm = () => {
  const { form, onSubmit } = useCreateHotlineForm();

  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      buttonText={{
        idle: "Create hotline",
        submitting: "Creating hotline...",
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
    </FormWrapper>
  );
};
