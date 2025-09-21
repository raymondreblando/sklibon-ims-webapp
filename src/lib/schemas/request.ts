import { z } from "zod";

const BaseSchema = z
  .object({
    request_type_id: z
      .string()
      .min(1, { message: "The request type field is required." }),
    name: z
      .string()
      .min(1, { message: " The request name field is required." })
      .max(250, {
        message: "Request name must not be greater than 250 characters.",
      }),
    description: z
      .string()
      .min(1, { message: " The description field is required." }),
    date_needed: z
      .string({ error: "The date needed field is required." })
      .min(1, { message: "The date needed field is required." }),
    receivable_id: z
      .string()
      .min(1, { message: "The receiver field is required." }),
    receivable_type: z.enum(["barangay", "user"], {
      error: "The receiver type field is required.",
    }),
    attachment: z.string().optional(),
    hasSelectedFile: z.boolean().optional(),
  })
  .refine((data) => data.hasSelectedFile === true, {
    path: ["hasSelectedFile"],
    error: "No attachment found. Please upload an attachment.",
  });

export const CreateRequestSchema = BaseSchema;
export const UpdateRequestSchema = BaseSchema;

export type CreateRequestField = z.infer<typeof CreateRequestSchema>;
export type UpdateRequestField = z.infer<typeof UpdateRequestSchema>;
