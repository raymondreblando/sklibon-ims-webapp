import { z } from "zod";

export const AttendanceReportSchema = z.object({
  event_id: z.string().optional(),
  with_time: z.boolean(),
});
export type AttendanceReportField = z.infer<typeof AttendanceReportSchema>;
