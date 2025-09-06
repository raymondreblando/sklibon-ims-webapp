import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useDialogContext } from "@/contexts/dialog-context";

import { handleRequestError } from "@/lib/utils/error-handler";
import { useChangeProfilePicMutation } from "@/hooks/mutations/use-account-mutation";
import {
  ChangeProfilePicSchema,
  type ChangeProfilePicField,
} from "@/lib/schemas/user";

export const useChangeProfilePicForm = () => {
  const mutation = useChangeProfilePicMutation();
  const { setOpen } = useDialogContext();

  const form = useForm<ChangeProfilePicField>({
    resolver: zodResolver(ChangeProfilePicSchema),
    defaultValues: {
      profile: "",
    },
  });

  const onSubmit = useCallback(
    async (values: ChangeProfilePicField) => {
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
