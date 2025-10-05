import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/constants/api-constants";
import type { UpdateReportField, UpdateReportStatusField } from "@/lib/schemas/report";
import {
  createReport,
  deleteAttachment,
  deleteReport,
  updateReport,
} from "@/services/api/reports";
import { useNavigate } from "@tanstack/react-router";

export const useCreateReportMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReport,
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REPORTS] });
      toast.success(message);
    },
  });
};

export const useUpdateReportMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string | undefined;
      data: UpdateReportField | UpdateReportStatusField;
    }) => updateReport(id, data),
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.REPORTS],
      });
      toast.success(message);
      navigate({ to: "/reports" });
    },
  });
};

export const useDeleteReportMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReport,
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REPORTS] });
      toast.success(message);
    },
  });
};

export const useDeleteAttachmentMutation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAttachment,
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REPORTS, id] });
      toast.success(message);
    },
  });
};
