import { z } from "zod";
import { AccountSchema, AddressSchema, UserInfoSchema } from "./user";

export const RegisterSchema = z.object({
  account: z.object({
    ...AccountSchema.pick({
      username: true,
      email: true,
      password: true,
      password_confirmation: true,
    }).shape,
  }),
  info: z.object({
    barangay_id: AddressSchema.shape.barangay_id,
    ...UserInfoSchema.omit({ age: true, phone_number: true, birthdate: true })
      .shape,
  }),
});

export type RegisterField = z.infer<typeof RegisterSchema>;
