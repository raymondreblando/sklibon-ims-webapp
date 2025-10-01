import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatBubble } from "./chat-bubble";

const messages = [
  {
    isSender: false,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    isSender: false,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
  },
  {
    isSender: true,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    isSender: false,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
  },
  {
    isSender: true,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
  },
  {
    isSender: true,
    content: "Lorem ipsum dolor sit amet. ",
  },
  {
    isSender: false,
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
  },
];

interface ChatMessageWrapperProps {}

export const ChatMessageWrapper = ({}: ChatMessageWrapperProps) => {
  return (
    <ScrollArea className="h-[calc(100vh-340px)]">
      <div className="p-6">
        {messages.map((message, index) => (
          <ChatBubble
            key={`chat-bubble-${index}`}
            isSender={message.isSender}
            content={message.content}
          />
        ))}
      </div>
    </ScrollArea>
  );
};
