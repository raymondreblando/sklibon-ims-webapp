import { z } from "zod";

export const createRequestTypeSchema = z.object({
  name: z.string().min(1, { message: "The name field is required." }).max(100, {
    message: "Name must not be greater than 100 characters.",
  }),
});

export const updateRequestTypeSchema = createRequestTypeSchema.extend({
  status: z.enum(["active", "inactive"], {
    error: "The status field is required.",
  }),
});

export type CreateRequestTypeField = z.infer<typeof createRequestTypeSchema>;
export type UpdateRequestTypeField = z.infer<typeof updateRequestTypeSchema>;
