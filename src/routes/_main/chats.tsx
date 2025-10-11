import z from "zod";
import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { MessageProvider } from "@/contexts/message-context";
import { ChatList, ChatMessage } from "@/components/layouts/chat";
import { useBreadcrumb } from "@/components/ui/breadcrumb";
import { EmptyInbox } from "@/components/layouts/empty-states";

const searchChatSchema = z.object({
  chatId: z.string().optional(),
});

export const Route = createFileRoute("/_main/chats")({
  validateSearch: searchChatSchema,
  component: RouteComponent,
});

function RouteComponent() {
  const { setItems } = useBreadcrumb();
  const { chatId } = Route.useSearch();

  useEffect(() => {
    setItems([{ title: "Chats" }]);
  }, [setItems]);

  return (
    <div className="grid gap-4 p-4 md:p-8 lg:grid-cols-[400px_1fr]">
      <ChatList />
      {chatId ? (
        <MessageProvider>
          <ChatMessage />
        </MessageProvider>
      ) : (
        <div className="border-input hidden rounded-md border lg:block">
          <EmptyInbox props={{ className: "min-h-[calc(100vh-150px)]" }} message="No selected conversation. Please select one to view messages." />
        </div>
      )}
    </div>
  );
}
