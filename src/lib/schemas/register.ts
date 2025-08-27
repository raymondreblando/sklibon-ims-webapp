import { z } from "zod";

export const accountSchema = z
  .object({
    username: z
      .string()
      .min(1, { message: "The username field is required." })
      .max(100, {
        message: "Username must not be greater than 100 characters.",
      }),
    email: z
      .email({ message: "The email field must be a valid email address." })
      .max(100, {
        message: "Email address must not be greater than 100 characters.",
      }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    password_confirmation: z
      .string()
      .min(8, { message: "Confirm account password." }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Password does not match.",
    path: ["password_confirmation"],
  });

export const infoSchema = z.object({
  firstname: z
    .string()
    .min(1, { message: "The firstname field is required." })
    .max(100, {
      message: "Firstname must not be greater than 100 characters.",
    }),
  middlename: z.string().optional(),
  lastname: z
    .string()
    .min(1, { message: "The lastname field is required." })
    .max(100, {
      message: "Lastname must not be greater than 100 characters.",
    }),
  gender: z.string().min(1, { message: "Select a gender." }),
  barangay_id: z.string().min(1, { message: "Select a barangay." }),
  position_id: z.string().min(1, { message: "Select a position." }),
});

export const registerSchema = z.object({
  account: accountSchema,
  info: infoSchema,
});

export type RegisterField = z.infer<typeof registerSchema>;
