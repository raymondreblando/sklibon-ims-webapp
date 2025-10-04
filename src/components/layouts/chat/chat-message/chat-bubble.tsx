import { cn } from "@/lib/utils/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatBubbleProps {
  isSender: boolean;
  content: string;
}

export const ChatBubble = ({ isSender, content }: ChatBubbleProps) => {
  return (
    <div className={cn("flex mb-2 last:mb-0", isSender && "justify-end")}>
      <div
        className={cn(
          "flex items-end gap-x-4",
          isSender && "flex-row-reverse",
        )}
      >
        {!isSender && (
          <Avatar className="h-8 w-8 border-2">
            <AvatarImage
              src={
                "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/profiles/a37921be-1616-4722-8706-11699f89684c-momo-square.png"
              }
            />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {"Momo".charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
        <div
          className={cn(
            "max-w-[600px] rounded-t-2xl p-4",
            isSender
              ? "bg-primary/90 text-primary-foreground rounded-l-2xl"
              : "bg-muted/15 text-muted-foreground rounded-r-2xl",
          )}
        >
          <p className="text-sm font-medium">{content}</p>
        </div>
      </div>
    </div>
  );
};
