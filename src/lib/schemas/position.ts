import { z } from "zod";

export const createPositionSchema = z.object({
  name: z
    .string()
    .min(1, { message: "The position field is required." })
    .max(100, {
      message: "Position must not be greater than 100 characters.",
    }),
});

export const updatePositionSchema = createPositionSchema.extend({
  status: z.enum(["active", "inactive"], {
    error: "The status field is required.",
  }),
});

export type CreatePositionField = z.infer<typeof createPositionSchema>;
export type UpdatePositionField = z.infer<typeof updatePositionSchema>;
