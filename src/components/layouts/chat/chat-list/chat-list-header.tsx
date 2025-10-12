import { Heading } from "@/components/headings";
import {
  CreateGroupChatDialog,
  CreatePrivateChatDialog,
} from "@/components/modals";

export const ChatListHeader = () => {
  return (
    <div className="flex items-center justify-between gap-4 px-6 py-5">
      <Heading>Messages</Heading>
      <div className="space-x-2">
        <CreatePrivateChatDialog />
        <CreateGroupChatDialog />
      </div>
    </div>
  );
};
