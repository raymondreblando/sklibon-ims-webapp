import { cn } from "@/lib/utils/utils";
import type { ComponentProps } from "react";
import { Separator } from "@/components/ui/separator";
import { AuthBranding } from "./auth-branding";

interface AuthWrapperProps extends ComponentProps<"div"> {
  children: React.ReactNode;
}

export const AuthWrapper = ({
  className,
  children,
  ...props
}: AuthWrapperProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div
        className={cn("w-[min(100%,600px)] px-4 py-8", className)}
        {...props}
      >
        <AuthBranding />
        <Separator className="my-8" />
        <div className="flex flex-1 flex-col gap-y-8">{children}</div>
      </div>
    </div>
  );
};
