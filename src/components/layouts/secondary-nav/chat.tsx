import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Chat = () => {
  return (
    <div className="relative">
      <Button asChild variant="ghost" size="icon">
        <MessageCircle className="size-5!" />
      </Button>
      <span className="bg-accent text-accent-foreground absolute -top-1 -right-1 grid h-4 w-4 place-content-center rounded-full text-[8px] font-semibold">
        12
      </span>
    </div>
  );
};
