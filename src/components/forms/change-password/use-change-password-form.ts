import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { handleRequestError } from "@/lib/utils/error-handler";
import { useChangePasswordMutation } from "@/hooks/mutations/use-account-mutation";
import {
  ChangePasswordSchema,
  type ChangePasswordField,
} from "@/lib/schemas/user";
import { useDialogContext } from "@/contexts/dialog-context";

export const useChangePasswordForm = () => {
  const mutation = useChangePasswordMutation();
  const { setOpen } = useDialogContext();

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
        form.reset();
        setOpen(false);
      } catch (error) {
        handleRequestError({ error, setError: form.setError });
      }
    },
    [mutation, form, setOpen],
  );

  return { form, onSubmit };
};
