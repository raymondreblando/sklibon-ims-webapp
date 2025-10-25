import { QUERY_KEYS } from "@/lib/constants/api-constants";
import { useAttendanceReportForm } from "./use-attendance-report-form";

import { getEvents } from "@/services/api/events";
import { FormCheckbox, FormCombobox, FormWrapper } from "@/components/forms";

export const AttendanceReportForm = () => {
  const { form, onSubmit } = useAttendanceReportForm();

  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      buttonText={{
        idle: "Generate",
        submitting: "Generating...",
      }}
    >
      <FormCombobox
        popoverContentClassname="w-[300px] p-0 md:w-[450px]"
        name="event_id"
        label="Event"
        placeholder="Select a event"
        resource="events"
        commandPlaceholder="Search events..."
        queryKey={[QUERY_KEYS.EVENTS]}
        queryFn={getEvents}
        labelKey="name"
        valueKey="id"
      />
      <FormCheckbox
        name="with_time"
        label="Generate with minutes count"
        item={{
          id: "true",
          label: "With Minute Count",
          description:
            "This will generate the report with minucte count based on time-in's and time-out's.",
        }}
        className="md:col-span-2"
      />
    </FormWrapper>
  );
};
