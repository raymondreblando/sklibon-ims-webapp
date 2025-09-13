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
  gender: z.string().min(1, { message: "Please select a valid gender." }),
  age: z.coerce
    .number<number>({ error: "The age field is required." })
    .min(1, { message: "The age field is required." }),
  phone_number: z
    .string({ error: "The phone number field is required." })
    .min(11, { message: "Please provide a valid phone number." })
    .max(11, { message: "Please provide a valid phone number." }),
  birthdate: z
    .string({ error: "The birthdate field is required." })
    .min(1, { message: "The birthdate field is required." }),
  position_id: z
    .string({
      error: "Please select a valid position.",
    })
    .min(1, { message: "Please select a valid position." }),
});

export const AddressSchema = z.object({
  province_id: z
    .string({
      error: "Please select a valid province.",
    })
    .min(1, { message: "Please select a valid province." }),
  municipality_id: z
    .string({
      error: "Please select a valid municipality.",
    })
    .min(1, { message: "Please select a valid municipality." }),
  barangay_id: z
    .string({
      error: "Please select a valid barangay.",
    })
    .min(1, { message: "Please select a valid barangay." }),
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

const InfoSchema = z.object({
  ...AddressSchema.shape,
  ...UserInfoSchema.shape,
});

export const CreateUserSchema = z.object({
  info: InfoSchema,
  account: AccountSchema.omit({ status: true }),
});

export const UpdateUserSchema = z.object({
  action: z.enum(["update", "deactivated", "blocked"]),
  info: InfoSchema,
  account: z.object({
    ...AccountSchema.omit({ password: true, password_confirmation: true })
      .shape,
    password: z.string().optional(),
    password_confirmation: z.string().optional(),
  }),
});

export const UserProfileSchema = z.object({
  info: InfoSchema,
  account: z.object({
    ...AccountSchema.pick({ username: true, email: true }).shape,
  }),
});

export const ChangePasswordSchema = z
  .object({
    current_password: z
      .string()
      .min(1, { message: "Please provide your current account password." }),
    new_password: z
      .string()
      .min(8, { message: "New password must be at least 8 characters." }),
    new_password_confirmation: z.string(),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    message: "Password not matched.",
    path: ["new_password_confirmation"],
  });

export const ChangeProfilePicSchema = z
  .object({
    profile: z.string().optional(),
    hasSelectedFile: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.profile && !data.hasSelectedFile) {
      ctx.addIssue({
        code: "custom",
        path: ["profile"],
        message: "Please select a profile picture to upload.",
      });
    }
  });

export type CreateUserField = z.infer<typeof CreateUserSchema>;
export type UpdateUserField = z.infer<typeof UpdateUserSchema>;
export type UserProfileField = z.infer<typeof UserProfileSchema>;
export type ChangePasswordField = z.infer<typeof ChangePasswordSchema>;
export type ChangeProfilePicField = z.infer<typeof ChangeProfilePicSchema>;
