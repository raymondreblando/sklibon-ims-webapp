import { GENDERS } from "@/lib/constants";
import { QUERY_KEYS } from "@/lib/constants/api-constants";

import { getBarangays } from "@/services/api/locations";
import { getPositions } from "@/services/api/positions";

import { FormAsyncSelect, FormInput, FormSelect } from "@/components/forms";

const UserInfo = () => {
  return (
    <>
      <FormInput variant="xl" name="info.firstname" label="Firstname" />
      <FormInput variant="xl" name="info.middlename" label="Middlename" />
      <FormInput variant="xl" name="info.lastname" label="Lastname" />
      <FormSelect
        size="xl"
        name="info.gender"
        label="Gender"
        options={GENDERS}
        placeholder="Select gender"
      />
      <FormAsyncSelect
        size="xl"
        name="info.barangay_id"
        label="Barangay"
        placeholder="Select barangay"
        queryKey={[QUERY_KEYS.BARANGAYS]}
        queryFn={getBarangays}
        labelKey="name"
        valueKey="id"
      />
      <FormAsyncSelect
        size="xl"
        name="info.position_id"
        label="Position"
        placeholder="Select position"
        queryKey={[QUERY_KEYS.POSITIONS]}
        queryFn={getPositions}
        labelKey="name"
        valueKey="id"
      />
    </>
  );
};

export default UserInfo;
