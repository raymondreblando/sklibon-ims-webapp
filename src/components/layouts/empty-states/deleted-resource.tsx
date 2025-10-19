import { cn } from "@/lib/utils/utils";
import { router } from "@/lib/router";
import { type ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import TrashIcon from "@/assets/trash.svg";

interface DeletedResourceProps extends ComponentProps<"div"> {
  resource: string;
}

export const DeletedResource = ({
  resource,
  className,
  ...props
}: DeletedResourceProps) => {
  return (
    <div
      {...props}
      className={cn(
        "flex min-h-[calc(100vh-220px)] flex-col items-center justify-center gap-y-4 text-center text-sm font-medium",
        className,
      )}
    >
      <img src={TrashIcon} alt="empty" className="w-28" />
      <h1 className="text-base font-semibold md:text-xl">
        This resource may have been deleted.
      </h1>
      <p className="text-muted max-w-[500px] text-sm font-medium">
        The {resource} you’re trying to view might have already been deleted or
        is no longer available. You’ll be redirected back to the previous page.
      </p>
      <Button size="lg" onClick={() => router.history.back()}>
        Go to Previous Page
      </Button>
    </div>
  );
};
