import { format } from "date-fns";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  UpdateRequestSchema,
  type UpdateRequestField,
} from "@/lib/schemas/request";
import { handleRequestError } from "@/lib/utils/error-handler";
import { Route } from "@/routes/_main/requests/$requestId.edit";

import { useFileUpload } from "@/contexts/file-upload-context";
import { useImagekitUpload } from "@/hooks/imagekit/use-imagekit-upload";
import { useUpdateRequestMutation } from "@/hooks/mutations/use-request-mutations";
import { useFindRequestQuery } from "@/hooks/queries/use-requests-query";

export const useUpdateRequestForm = () => {
  const requestId = Route.useParams().requestId;
  const navigate = Route.useNavigate();

  const { data } = useFindRequestQuery(requestId);
  const { folder, files, resetUploads } = useFileUpload();
  const { uploadFile } = useImagekitUpload(folder);
  const mutation = useUpdateRequestMutation();

  const form = useForm<UpdateRequestField>({
    resolver: zodResolver(UpdateRequestSchema),
    defaultValues: {
      request_type_id: data?.type.id,
      name: data?.name,
      description: data?.description,
      status: data?.status,
      date_needed: data?.dateNeeded
        ? format(new Date(data?.dateNeeded), "yyyy-MM-dd")
        : "",
      receivable_id: data?.receiver.id,
      receivable_type: data?.receivableType,
      attachment: data?.attachment,
      hasSelectedFile: true,
    },
  });

  const onSubmit = useCallback(async () => {
    try {
      if (files.length > 0) {
        const abortController = new AbortController();

        const response = await uploadFile(
          files[0].file,
          abortController.signal,
        );

        form.setValue("attachment", response?.url);
      }

      await mutation.mutateAsync({ id: requestId, data: form.getValues() });
      form.reset();
      resetUploads();
      navigate({ to: "/requests" });
    } catch (error) {
      handleRequestError({ error, setError: form.setError });
    }
  }, [form, mutation, files, uploadFile, resetUploads, requestId, navigate]);

  return { form, onSubmit };
};
