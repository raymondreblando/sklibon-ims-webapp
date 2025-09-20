import { z } from "zod";

export const ReportSchema = z
  .object({
    barangay_id: z
      .string({ error: "Please select a valid barangay." })
      .min(1, { message: "Please select a valid barangay" }),
    subject: z
      .string()
      .min(1, { message: "The subject field is required." })
      .max(255, {
        message: "Subject must not be greater than 255 characters.",
      }),
    description: z
      .string()
      .min(1, { message: "The description field is required." }),
    attachments: z
      .array(
        z.object({
          attachment: z.string(),
          filename: z.string(),
          file_type: z.string(),
          file_size: z.number(),
        }),
      )
      .optional(),
    hasSelectedFile: z.boolean().optional(),
  })
  .refine((data) => data.hasSelectedFile === true, {
    path: ["hasSelectedFile"],
    error: "No attachment found. Kindly upload a file.",
  });

export type CreateReportField = z.infer<typeof ReportSchema>;
export type UpdateReportField = z.infer<typeof ReportSchema>;
