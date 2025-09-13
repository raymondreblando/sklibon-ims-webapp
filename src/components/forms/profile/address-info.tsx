import { QUERY_KEYS } from "@/lib/constants/api-constants";
import {
  getBarangays,
  getMunicipalities,
  getProvinces,
} from "@/services/api/locations";

import { FormCombobox, FormInput } from "@/components/forms";
import { HeadingWithWrapper } from "@/components/headings";

const comboBoxClassName = "w-[350px] p-0 md:w-[325px]";

export const AddressInfo = () => {
  return (
    <div className="border-input flex flex-col gap-y-4 rounded-md md:border md:p-8">
      <HeadingWithWrapper
        className="text-left"
        headingProps={{ variant: "default" }}
        heading="Address Information"
        subheading="Manage your barangay, municipality, and province details."
      />
      <div className="grid gap-4 md:grid-cols-2">
        <FormCombobox
          popoverContentClassname={comboBoxClassName}
          name="info.province_id"
          label="Province"
          placeholder="Select a province"
          resource="provinces"
          commandPlaceholder="Search provinces..."
          queryKey={[QUERY_KEYS.PROVINCES]}
          queryFn={getProvinces}
          labelKey="name"
          valueKey="id"
        />
        <FormCombobox
          popoverContentClassname={comboBoxClassName}
          name="info.municipality_id"
          label="Municipality"
          placeholder="Select a municipality"
          resource="municipalities"
          commandPlaceholder="Search municipalities..."
          queryKey={[QUERY_KEYS.MUNICIPALITIES]}
          queryFn={getMunicipalities}
          labelKey="name"
          valueKey="id"
        />
        <FormCombobox
          popoverContentClassname={comboBoxClassName}
          name="info.barangay_id"
          label="Barangay"
          placeholder="Select a barangay"
          resource="barangays"
          commandPlaceholder="Search barangays..."
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
