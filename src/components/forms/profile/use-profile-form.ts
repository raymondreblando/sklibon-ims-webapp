import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { getAuthUser } from "@/lib/utils/auth";
import { handleRequestError } from "@/lib/utils/error-handler";
import { useUpdateUserMutation } from "@/hooks/mutations/use-users-mutations";
import { UserProfileSchema, type UserProfileField } from "@/lib/schemas/user";

export const useProfileForm = () => {
  const mutation = useUpdateUserMutation();
  const user = getAuthUser();

  const form = useForm<UserProfileField>({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: {
      account: {
        username: user?.username,
        email: user?.email,
      },
      info: {
        firstname: user?.info.firstname,
        middlename: user?.info.middlename,
        lastname: user?.info.lastname,
        gender: user?.info.gender,
        age: user?.info.age,
        phone_number: user?.info.phoneNumber,
        birthdate: user?.info.birthdate,
        position_id: user?.info.position.id,
        province_id: user?.info.province.id,
        municipality_id: user?.info.municipality.id,
        barangay_id: user?.info.barangay.id,
        additional_address: user?.info.additionalAddress,
      },
    },
  });

  const onSubmit = useCallback(
    async (values: UserProfileField) => {
      try {
        await mutation.mutateAsync({ id: user?.id, data: values });
        form.reset();
      } catch (error) {
        handleRequestError({ error, setError: form.setError });
      }
    },
    [form, mutation, user],
  );

  return { form, onSubmit };
};
