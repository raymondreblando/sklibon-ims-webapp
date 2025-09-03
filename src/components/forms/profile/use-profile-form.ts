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
        username: "",
        email: "",
      },
      info: {
        firstname: "",
        middlename: "",
        lastname: "",
        gender: "",
        age: undefined,
        phone_number: "",
        birthdate: undefined,
        position_id: "",
        province_id: "",
        municipality_id: "",
        barangay_id: "",
        additional_address: "",
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
