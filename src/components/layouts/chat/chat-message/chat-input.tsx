import { SendHorizonalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {}

export const ChatInput = ({}: ChatInputProps) => {
  return (
    <div className="flex items-center gap-x-4 px-6 py-4">
      <Textarea className="min-h-4 resize-none" />
      <Button
        variant="outline"
        size="xl"
        className="bg-input hover:bg-input/50 hover:text-foreground h-16 min-w-16 transition-colors"
      >
        <SendHorizonalIcon />
      </Button>
    </div>
  );
};
