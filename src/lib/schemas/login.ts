import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string().min(1, {
    message: "The username field is required.",
  }),
  password: z.string().min(1, {
    message: "The password field is required.",
  }),
});

export type LoginField = z.infer<typeof LoginSchema>;
