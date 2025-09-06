import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { handleRequestError } from "@/lib/utils/error-handler";
import { useChangePasswordMutation } from "@/hooks/mutations/use-account-mutation";
import { useModal } from "@/contexts/modal-context";
import {
  ChangePasswordSchema,
  type ChangePasswordField,
} from "@/lib/schemas/user";

export const useChangePasswordForm = () => {
  const { hide } = useModal();
  const mutation = useChangePasswordMutation();

  const form = useForm<ChangePasswordField>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
  });

  const onSubmit = useCallback(
    async (values: ChangePasswordField) => {
      try {
        await mutation.mutateAsync(values);
        hide();
      } catch (error) {
        handleRequestError({ error, setError: form.setError });
      }
    },
    [mutation, form, hide],
  );

  return { form, onSubmit };
};
