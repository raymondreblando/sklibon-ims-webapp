import { GENDERS } from "@/lib/constants";
import { QUERY_KEYS } from "@/lib/constants/api-constants";
import { getPositions } from "@/services/api/positions";

import { HeadingWithWrapper } from "@/components/headings";
import {
  FormDatePicker,
  FormInput,
  FormSelect,
  FormCombobox,
} from "@/components/forms";

export const UserInfo = () => {
  return (
    <div className="border-input flex flex-col gap-y-4 rounded-md md:border md:p-8">
      <HeadingWithWrapper
        className="text-left"
        headingProps={{ variant: "default" }}
        heading="Personal Information"
        subheading="Your basic details like name, date of birth, and contact number. Keep them accurate and up to date."
      />
      <div className="grid gap-4 md:grid-cols-2">
        <FormInput name="info.firstname" label="Firstname" />
        <FormInput name="info.middlename" label="Middlename" />
        <FormInput name="info.lastname" label="Lastname" />
        <FormSelect
          name="info.gender"
          label="Gender"
          options={GENDERS}
          placeholder="Select gender"
        />
        <FormInput name="info.age" label="Age" />
        <FormInput name="info.phone_number" label="Phone number" />
        <FormDatePicker name="info.birthdate" label="Birthdate" />
        <FormCombobox
          popoverContentClassname="w-[350px] p-0 md:w-[325px]"
          name="info.position_id"
          label="Position"
          placeholder="Select a position"
          resource="positions"
          commandPlaceholder="Search positions..."
          queryKey={[QUERY_KEYS.POSITIONS]}
          queryFn={getPositions}
          labelKey="name"
          valueKey="id"
        />
      </div>
    </div>
  );
};
