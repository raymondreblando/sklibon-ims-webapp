import { QUERY_KEYS } from "@/lib/constants/api-constants";
import { RECEIVABLE_TYPES } from "@/lib/constants";
import { useCreateRequestForm } from "./use-create-request-form";

import { getRequestTypes } from "@/services/api/request-types";
import { getUsers } from "@/services/api/users";
import { getBarangays } from "@/services/api/locations";

import { FormField } from "@/components/ui/form";
import { FileUpload } from "@/components/upload";
import {
  FormCombobox,
  FormDatePicker,
  FormInput,
  FormRadio,
  FormTextarea,
  FormWrapper,
} from "@/components/forms";

export const CreateRequestForm = () => {
  const { form, onSubmit } = useCreateRequestForm();
  const receiverType = form.watch("receivable_type");

  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      buttonText={{
        idle: "Create request",
        submitting: "Creating request...",
      }}
      buttonProps={{ className: "md:col-span-2" }}
      formProps={{ className: "grid md:grid-cols-2 gap-4 p-4 md:px-8 md:py-5" }}
    >
      <FormInput className="md:col-span-2" name="name" label="Request name" />
      <FormTextarea
        className="md:col-span-2"
        name="description"
        label="Description"
      />
      <FormCombobox
        popoverContentClassname="w-[300px] p-0 md:w-[300px]"
        name="request_type_id"
        label="Request type"
        placeholder="Select a request type"
        resource="request types"
        commandPlaceholder="Search request types..."
        queryKey={[QUERY_KEYS.REQUEST_TYPES]}
        queryFn={getRequestTypes}
        labelKey="name"
        valueKey="id"
      />
      <FormDatePicker
        name="date_needed"
        label="Date needed"
        calendarProps={{ disabled: false }}
      />
      <FormRadio
        name="receivable_type"
        label="Receiver type"
        options={RECEIVABLE_TYPES}
      />
      {receiverType === "user" ? (
        <FormCombobox
          popoverContentClassname="w-[300px] p-0 md:w-[300px]"
          name="receivable_id"
          label="Receiver"
          placeholder="Select a member"
          resource="sk members"
          commandPlaceholder="Search sk members..."
          queryKey={[QUERY_KEYS.USERS]}
          queryFn={getUsers}
          labelKey="fullname"
          valueKey="id"
        />
      ) : (
        <FormCombobox
          popoverContentClassname="w-[300px] p-0 md:w-[300px]"
          name="receivable_id"
          label="Receiver"
          placeholder="Select a barangay"
          resource="barangays"
          commandPlaceholder="Search barangays..."
          queryKey={[QUERY_KEYS.BARANGAYS]}
          queryFn={getBarangays}
          labelKey="name"
          valueKey="id"
        />
      )}

      <FormField
        control={form.control}
        name="hasSelectedFile"
        render={({ fieldState }) => (
          <FileUpload className="md:col-span-2" formError={fieldState.error} />
        )}
      />
    </FormWrapper>
  );
};
