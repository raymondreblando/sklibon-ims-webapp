import { useCallback } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { register } from "@/services/api/auth";
import { handleRequestError } from "@/lib/utils/error-handler";
import { RegisterSchema, type RegisterField } from "@/lib/schemas/register";

export const useRegisterForm = () => {
  const form = useForm<RegisterField>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      account: {
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      info: {
        firstname: "",
        middlename: "",
        lastname: "",
        gender: "",
        barangay_id: "",
        position_id: "",
      },
    },
  });

  const onSubmit = useCallback(
    async (values: RegisterField) => {
      try {
        const { message } = await register(values);

        form.reset();
        toast.success(message);
      } catch (error) {
        handleRequestError({ error, setError: form.setError });
      }
    },
    [form],
  );

  return { form, onSubmit };
};
