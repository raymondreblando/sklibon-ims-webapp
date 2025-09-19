import { cn } from "@/lib/utils/utils";
import type { ComponentProps } from "react";
import EmptyIcon from "@/assets/empty.svg";

export interface NoRecordProps {
  props?: ComponentProps<"div">;
}

export const NoRecord = ({ props }: NoRecordProps) => {
  return (
    <div
      {...props}
      className={cn(
        "flex flex-col items-center justify-center",
        props?.className,
      )}
    >
      <img src={EmptyIcon} alt="empty" className="w-36" />
      No record found.
    </div>
  );
};
