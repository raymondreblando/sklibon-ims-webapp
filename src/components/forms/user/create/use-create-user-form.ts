import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";

import { handleRequestError } from "@/lib/utils/error-handler";
import { useCreateUserMutation } from "@/hooks/mutations/use-users-mutations";
import { CreateUserSchema, type CreateUserField } from "@/lib/schemas/user";

export const useCreateUserForm = () => {
  const mutation = useCreateUserMutation();
  const navigate = useNavigate();

  const form = useForm<CreateUserField>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      account: {
        username: "",
        email: "",
        role_id: "",
        password: "",
        password_confirmation: "",
      },
      info: {
        firstname: "",
        middlename: "",
        lastname: "",
        gender: "",
        age: undefined,
        phone_number: "",
        birthdate: "",
        position_id: "",
        province_id: "",
        municipality_id: "",
        barangay_id: "",
        additional_address: "",
      },
    },
  });

  const onSubmit = useCallback(
    async (values: CreateUserField) => {
      try {
        await mutation.mutateAsync(values);
        form.reset();
        navigate({ to: "/users" });
      } catch (error) {
        handleRequestError({ error, setError: form.setError });
      }
    },
    [form, mutation, navigate],
  );

  return { form, onSubmit };
};
