import { z } from "zod";

export const CreateHotlineSchema = z.object({
  name: z
    .string()
    .min(1, { message: "The hotline name field is required." })
    .max(150, {
      message: "Hotline name must not be greater than 150 characters.",
    }),
  abbreviation: z
    .string()
    .min(1, { message: "The abbreviation field is required." })
    .max(30, {
      message: "Abbreviation must not be greater than 30 characters.",
    }),
  hotline: z
    .string()
    .min(1, { message: "The hotline number field is required." })
    .max(30, {
      message: "Hotline number must not be greater than 30 characters.",
    }),
});

export const UpdateHotlineSchema = CreateHotlineSchema.extend({
  status: z.enum(["active", "inactive"], {
    error: "The status field is required.",
  }),
});

export type CreateHotlineField = z.infer<typeof CreateHotlineSchema>;
export type UpdateHotlineField = z.infer<typeof UpdateHotlineSchema>;
