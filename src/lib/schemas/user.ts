import { z } from "zod";

export const UserInfoSchema = z.object({
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
  age: z.coerce.number().min(1, { message: "The age field is required." }),
  phone_number: z
    .string()
    .min(11, { message: "Please provide a valid phone number." })
    .max(11, { message: "Please provide a valid phone number." }),
  birthdate: z.date().min(new Date("1900-01-01"), {
    message: "Please enter a birthdate after January 1, 1900.",
  }),
  position_id: z.string().min(1, { message: "Select a position." }),
});

export const AddressSchema = z.object({
  province_id: z.string().min(1, { message: "Select a province." }),
  municipality_id: z.string().min(1, { message: "Select a municipality." }),
  barangay_id: z.string().min(1, { message: "Select a barangay." }),
  additional_address: z.string().optional(),
});

export const AccountSchema = z
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
    status: z.enum(["active", "deactivated", "blocked"], {
      error: "Please select a valid status.",
    }),
    role_id: z.string().min(1, "Please select a valid role."),
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

export const CreateUserSchema = z.object({
  info: {
    ...AddressSchema.shape,
    ...UserInfoSchema.shape,
  },
  account: AccountSchema.omit({ status: true }),
});

export const UpdateUserSchema = z.object({
  info: {
    ...AddressSchema.shape,
    ...UserInfoSchema.shape,
  },
  account: AccountSchema,
});

export type CreateUserField = z.infer<typeof CreateUserSchema>;
export type UpdateUserField = z.infer<typeof UpdateUserSchema>;
