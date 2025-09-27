import { z } from "zod";

const BaseSchema = z.object({
  barangay_id: z
    .string()
    .min(1, { message: "Please select a valid barangay." }),
  name: z
    .string()
    .min(1, { message: "The event name field is required." })
    .max(255, {
      message: "Event name must not be greater than 255 characters.",
    }),
  description: z
    .string()
    .min(1, { message: "The description field is required." }),
  event_date: z
    .string({ error: "The event date field is required." })
    .min(1, { message: "The event date field is required." }),
  expired_date: z
    .string({ error: "The event expired date field is required." })
    .min(1, { message: "The event expired date field is required." }),
  image_url: z.string().optional(),
  venue: z.string().min(1, { message: "The event venue field is required." }),
  hasSelectedFile: z.boolean(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  hasSelectedCoordinates: z.boolean(),
});

export const CreateEventSchema = BaseSchema.superRefine((data, ctx) => {
  if (!data.hasSelectedFile) {
    ctx.addIssue({
      code: "custom",
      message: "No event photo is uploaded. Please upload event photo.",
      path: ["hasSelectedFile"],
    });
  }

  if (!data.hasSelectedCoordinates) {
    ctx.addIssue({
      code: "custom",
      message:
        "Event location field is required. Please select event location.",
      path: ["hasSelectedCoordinates"],
    });
  }
});

const UpdateEventStatusSchema = z.object({
  status: z.enum(
    ["upcoming", "ongoing", "completed", "cancelled", "archived"],
    { error: "The status field is required." },
  ),
});

export const UpdateEventSchema = BaseSchema.extend({
  ...UpdateEventStatusSchema.shape,
});

export type CreateEventField = z.infer<typeof CreateEventSchema>;
export type UpdateEventField = z.infer<typeof UpdateEventSchema>;
export type UpdateEventStatusField = z.infer<typeof UpdateEventStatusSchema>;
