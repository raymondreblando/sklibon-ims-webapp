import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { handleRequestError } from "@/lib/utils/error-handler";
import { UpdateEventSchema, type UpdateEventField } from "@/lib/schemas/event";
import { useFindEventQuery } from "@/hooks/queries/use-events-query";
import { useUpdateEventMutation } from "@/hooks/mutations/use-event-mutations";

import { useFileUpload } from "@/contexts/file-upload-context";
import { useImagekitUpload } from "@/hooks/imagekit/use-imagekit-upload";
import { Route } from "@/routes/_main/events/$eventId.edit";
import { format } from "date-fns";

export const useUpdateEventForm = () => {
  const eventId = Route.useParams().eventId;
  const navigate = Route.useNavigate();

  const { data } = useFindEventQuery(eventId);
  const { folder, files, resetUploads } = useFileUpload();
  const { uploadFile } = useImagekitUpload(folder);
  const mutation = useUpdateEventMutation();

  const form = useForm<UpdateEventField>({
    resolver: zodResolver(UpdateEventSchema),
    defaultValues: {
      barangay_id: data?.barangay.id,
      name: data?.name,
      description: data?.description,
      event_date: data?.eventDate
        ? format(data.eventDate, "yyyy-MM-dd HH:mm:ss")
        : "",
      expired_date: data?.expiredDate
        ? format(data.expiredDate, "yyyy-MM-dd HH:mm:ss")
        : "",
      open_attendance: data?.openAttendance,
      status: data?.status,
      image_url: data?.imageUrl,
      venue: data?.venue,
      hasSelectedFile: true,
      latitude: data?.latitude,
      longitude: data?.longitude,
      hasSelectedCoordinates: true,
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

        form.setValue("image_url", response?.url);
      }

      await mutation.mutateAsync({ id: eventId, data: form.getValues() });
      form.reset();
      resetUploads();
      navigate({ to: "/events" });
    } catch (error) {
      handleRequestError({ error, setError: form.setError });
    }
  }, [form, mutation, files, uploadFile, resetUploads, eventId, navigate]);

  return { form, onSubmit };
};
