import { format } from "date-fns";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";

import { handleRequestError } from "@/lib/utils/error-handler";
import { useUpdateUserMutation } from "@/hooks/mutations/use-users-mutations";
import { UpdateUserSchema, type UpdateUserField } from "@/lib/schemas/user";
import { useProfileCard } from "@/contexts/profile-card-context";
import { Route } from "@/routes/_main/users/$userId.edit";

export const useUpdateUserForm = () => {
  const mutation = useUpdateUserMutation();
  const { user } = useProfileCard();
  const { userId } = Route.useParams();
  const navigate = useNavigate();

  const form = useForm<UpdateUserField>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      action: "update",
      account: {
        username: user.username,
        email: user.email,
        role_id: user.role.id,
        status: user.status,
        password: "",
        password_confirmation: "",
      },
      info: {
        firstname: user.info.firstname,
        middlename: user.info.middlename ?? "",
        lastname: user.info.lastname,
        gender: user.info.gender,
        age: user.info.age,
        phone_number: user.info.phoneNumber,
        birthdate: user.info.birthdate
          ? format(new Date(user.info.birthdate), "yyyy-MM-dd")
          : "",
        position_id: user.info.position?.id,
        province_id: user.info.province?.id,
        municipality_id: user.info.municipality?.id,
        barangay_id: user.info.barangay?.id,
        additional_address: user.info.additionalAddress ?? "",
      },
    },
  });

  const onSubmit = useCallback(
    async (values: UpdateUserField) => {
      try {
        await mutation.mutateAsync({ id: userId, data: values });
        navigate({ to: "/users" });
      } catch (error) {
        handleRequestError({ error, setError: form.setError });
      }
    },
    [form, mutation, userId, navigate],
  );

  return { form, onSubmit };
};
