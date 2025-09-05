import { QUERY_KEYS } from "@/lib/constants/api-constants";
import {
  getBarangays,
  getMunicipalities,
  getProvinces,
} from "@/services/api/location";

import {
  FormAsyncSelect,
  FormHeading,
  FormInput,
  FormSubheading,
} from "@/components/forms";

export const AddressInfo = () => {
  return (
    <div className="border-input flex flex-col gap-y-4 rounded-md md:border md:p-8">
      <div>
        <FormHeading>Address Information</FormHeading>
        <FormSubheading>
          Manage your barangay, municipality, and province details.
        </FormSubheading>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <FormAsyncSelect
          name="info.province_id"
          label="Province"
          placeholder="Select a province"
          queryKey={[QUERY_KEYS.PROVINCES]}
          queryFn={getProvinces}
          labelKey="name"
          valueKey="id"
        />
        <FormAsyncSelect
          name="info.municipality_id"
          label="Municipality"
          placeholder="Select a municipality"
          queryKey={[QUERY_KEYS.MUNICIPALITIES]}
          queryFn={getMunicipalities}
          labelKey="name"
          valueKey="id"
        />
        <FormAsyncSelect
          name="info.barangay_id"
          label="Barangay"
          placeholder="Select a barangay"
          queryKey={[QUERY_KEYS.BARANGAYS]}
          queryFn={getBarangays}
          labelKey="name"
          valueKey="id"
        />
        <FormInput
          name="info.addtional_address"
          label="Additional"
          placeholder="Optional"
        />
      </div>
    </div>
  );
};
