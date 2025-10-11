import { z } from "zod";

export const CreatePrivateChatSchema = z.object({
  receiver_id: z
    .string({ error: "Please select a user." })
    .min(1, { message: "Please select a user." }),
  message: z.string().min(1, { message: "Message is required to proceed." }),
});

export const CreateGroupChatSchema = z.object({
  name: z
    .string({ error: "Group chat name is required." })
    .min(1, { message: "Group chat name is required." })
    .max(255, { message: "Group chat name must not exceeds 255 characters." }),
  message: z.string().min(1, { message: "Message is required to proceed." }),
});

export type CreatePrivateChatField = z.infer<typeof CreatePrivateChatSchema>;
export type CreateGroupChatField = z.infer<typeof CreateGroupChatSchema>;
