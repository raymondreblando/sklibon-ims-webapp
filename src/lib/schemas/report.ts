import { z } from "zod";

export const AttachmentSchema = z.object({
  attachment: z.string(),
  filename: z.string(),
  file_type: z.string(),
  file_size: z.number(),
});

const CreateAttachmentSchema = z.object({
  report_id: z.string(),
  attachments: z.array(AttachmentSchema).optional(),
});

const BaseSchema = z.object({
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
  attachments: z.array(AttachmentSchema).optional(),
  hasSelectedFile: z.boolean().optional(),
});

export const CreateReportSchema = BaseSchema.refine(
  (data) => data.hasSelectedFile === true,
  {
    path: ["hasSelectedFile"],
    error: "No attachment found. Kindly upload a file.",
  },
);

export const UpdateReportSchema = BaseSchema.omit({ attachments: true });

export type CreateReportField = z.infer<typeof CreateReportSchema>;
export type UpdateReportField = z.infer<typeof UpdateReportSchema>;
export type CreateAttachmentField = z.infer<typeof CreateAttachmentSchema>;
