import { ChatList, ChatMessage } from "@/components/layouts/chat";
import { useBreadcrumb } from "@/components/ui/breadcrumb";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_main/chats")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setItems } = useBreadcrumb();

  useEffect(() => {
    setItems([{ title: "Chats" }]);
  }, [setItems]);

  return (
    <div className="grid grid-cols-[400px_1fr] gap-4 p-4 md:p-8">
      <ChatList />
      <ChatMessage />
    </div>
  );
}
