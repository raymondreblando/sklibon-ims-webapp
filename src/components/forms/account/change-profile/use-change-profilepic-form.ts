import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useModal } from "@/contexts/modal-context";
import { useFileUpload } from "@/contexts/file-upload-context";
import { useImagekitUpload } from "@/hooks/imagekit/use-imagekit-upload";

import { handleRequestError } from "@/lib/utils/error-handler";
import { useChangeProfilePicMutation } from "@/hooks/mutations/use-account-mutation";
import {
  ChangeProfilePicSchema,
  type ChangeProfilePicField,
} from "@/lib/schemas/user";

export const useChangeProfilePicForm = () => {
  const { hide } = useModal();
  const { files, folder, resetUploads } = useFileUpload();
  const { uploadFile } = useImagekitUpload(folder);

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
      if (!files?.length) {
        form.setError("profile", {
          message: "Please select a profile picture to upload.",
        });
        return;
      }

      const abortController = new AbortController();

      const response = await uploadFile(files[0].file, abortController.signal);
      await mutation.mutateAsync({ profile: response?.url });
      hide();
      resetUploads();
    } catch (error) {
      handleRequestError({ error, setError: form.setError });
    }
  }, [mutation, form, hide, files, uploadFile, resetUploads]);

  return { form, onSubmit };
};
