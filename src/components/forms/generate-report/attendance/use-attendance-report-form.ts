import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { handleRequestError } from "@/lib/utils/error-handler";
import { generateAttendanceReport } from "@/services/api/generate-reports";
import {
  AttendanceReportSchema,
  type AttendanceReportField,
} from "@/lib/schemas/generate-report";
import { downloadFile } from "@/lib/utils/utils";

export const useAttendanceReportForm = () => {
  const form = useForm<AttendanceReportField>({
    resolver: zodResolver(AttendanceReportSchema),
    defaultValues: {
      event_id: "",
      with_time: false,
    },
  });

  const onSubmit = useCallback(
    async (data: AttendanceReportField) => {
      try {
        const response = await generateAttendanceReport(data);

        downloadFile("attendance.pdf", response);
        form.reset();
      } catch (error) {
        handleRequestError({ error, setError: form.setError });
      }
    },
    [form],
  );

  return { form, onSubmit };
};
