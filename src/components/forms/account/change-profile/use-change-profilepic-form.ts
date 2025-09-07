import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useModal } from "@/contexts/modal-context";
import { useUpload } from "@/contexts/upload-context";
import { useUploadFile } from "@/hooks/upload/use-upload-file";

import { handleRequestError } from "@/lib/utils/error-handler";
import { useChangeProfilePicMutation } from "@/hooks/mutations/use-account-mutation";
import {
  ChangeProfilePicSchema,
  type ChangeProfilePicField,
} from "@/lib/schemas/user";

export const useChangeProfilePicForm = () => {
  const { hide } = useModal();
  const { files } = useUpload();
  const { uploadFile } = useUploadFile();

  const mutation = useChangeProfilePicMutation();

  const form = useForm<ChangeProfilePicField>({
    resolver: zodResolver(ChangeProfilePicSchema),
    defaultValues: {
      profile: "",
      hasSelectedFile: false,
    },
  });

  const onSubmit = useCallback(async () => {
    try {
      const abortController = new AbortController();

      const url = await uploadFile(files?.[0] as File, abortController.signal);
      await mutation.mutateAsync({ profile: url });
      hide();
    } catch (error) {
      handleRequestError({ error, setError: form.setError });
    }
  }, [mutation, form, hide, files, uploadFile]);

  return { form, onSubmit };
};
