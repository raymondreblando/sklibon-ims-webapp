import { isBefore, startOfDay } from "date-fns";
import { QUERY_KEYS } from "@/lib/constants/api-constants";
import { useCreateEventForm } from "./use-create-event-form";

import { getBarangays } from "@/services/api/locations";

import { ImageUpload } from "@/components/upload";
import { EventMapDialog } from "@/components/modals";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import {
  FormCombobox,
  FormDateTimePicker,
  FormInput,
  FormTextarea,
  FormWrapper,
} from "@/components/forms";

export const CreateEventForm = () => {
  const { form, onSubmit } = useCreateEventForm();

  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      buttonText={{
        idle: "Create event",
        submitting: "Creating event...",
      }}
      buttonProps={{ className: "md:col-span-2" }}
      formProps={{ className: "grid md:grid-cols-2 gap-4 p-4 md:px-8 md:py-5" }}
    >
      <FormCombobox
        popoverContentClassname="w-[300px] p-0 md:w-[300px]"
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
      <FormInput name="name" label="Event name" />
      <FormDateTimePicker
        name="event_date"
        label="Event Date"
        className="md:col-span-2"
        calendarProps={{
          disabled: (date) => isBefore(date, startOfDay(new Date())),
        }}
      />
      <FormDateTimePicker
        name="expired_date"
        label="Expired Date"
        className="md:col-span-2"
        calendarProps={{
          disabled: (date) => isBefore(date, startOfDay(new Date())),
        }}
      />
      <FormTextarea
        className="md:col-span-2"
        name="description"
        label="Description"
      />
      <FormField
        control={form.control}
        name="hasSelectedFile"
        render={({ fieldState }) => (
          <ImageUpload
            wrapperProps={{ className: "md:col-span-2 space-y-2" }}
            previewWrapperProps={{ className: "block" }}
            formError={fieldState.error}
          />
        )}
      />
      <FormInput name="venue" label="Event venue" className="md:col-span-2" />
      <FormField
        control={form.control}
        name="hasSelectedCoordinates"
        render={() => (
          <FormItem className="flex flex-col justify-start md:col-span-2">
            <EventMapDialog />
            <FormMessage />
          </FormItem>
        )}
      />
    </FormWrapper>
  );
};
