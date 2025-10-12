import { cn } from "@/lib/utils/utils";
import type { ComponentProps } from "react";
import EmptyInboxIcon from "@/assets/empty-inbox.svg";

export interface EmptyInboxProps {
  message: string;
  props?: ComponentProps<"div">;
}

export const EmptyInbox = ({ props, message }: EmptyInboxProps) => {
  return (
    <div
      {...props}
      className={cn(
        "flex flex-col items-center justify-center text-sm font-medium",
        props?.className,
      )}
    >
      <img src={EmptyInboxIcon} alt="empty" className="w-28" />
      {message}
    </div>
  );
};
