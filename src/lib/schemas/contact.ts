import { z } from "zod";

export const CreateContactSchema = z.object({
  user_id: z.string().min(1, { message: "Please select a valid user." }),
  contact_number: z
    .string()
    .min(11, { message: "Please enter a valid 11 digits contact number." })
    .max(11, {
      message: "Please enter a valid 11 digits contact number.",
    }),
});

export const UpdateContactSchema = CreateContactSchema;

export type CreateContactField = z.infer<typeof CreateContactSchema>;
export type UpdateContactField = z.infer<typeof UpdateContactSchema>;
