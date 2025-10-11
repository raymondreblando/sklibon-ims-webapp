import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { MessageProvider } from "@/contexts/message-context";
import { ChatList, ChatMessage } from "@/components/layouts/chat";
import { useBreadcrumb } from "@/components/ui/breadcrumb";

export const Route = createFileRoute("/_main/chats")({
  validateSearch: (search: Record<string, unknown>): { chatId?: string } => {
    const chatId = search.chatId as string;

    return {
      chatId: chatId ? chatId : undefined,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { setItems } = useBreadcrumb();

  useEffect(() => {
    setItems([{ title: "Chats" }]);
  }, [setItems]);

  return (
    <div className="grid gap-4 p-4 md:grid-cols-[400px_1fr] md:p-8">
      <ChatList />
      <MessageProvider>
        <ChatMessage />
      </MessageProvider>
    </div>
  );
}
