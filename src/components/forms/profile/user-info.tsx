import { GENDERS } from "@/lib/constants";
import { QUERY_KEYS } from "@/lib/constants/api-constants";
import { getPositions } from "@/services/api/position";

import {
  FormAsyncSelect,
  FormDatePicker,
  FormInput,
  FormSelect,
} from "@/components/forms";

export const UserInfo = () => {
  return (
    <div className="border-input rounded-md border p-8">
      <div>
        <h3 className="text-sm font-semibold md:text-base">
          Personal Information
        </h3>
        <p className="text-muted text-xs md:text-sm">
          Your basic details like name, date of birth, and contact number. Keep
          them accurate and up to date.
        </p>
      </div>
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
        <FormAsyncSelect
          name="info.position_id"
          label="Position"
          placeholder="Select position"
          queryKey={[QUERY_KEYS.POSITIONS]}
          queryFn={getPositions}
          labelKey="name"
          valueKey="id"
        />
      </div>
    </div>
  );
};
