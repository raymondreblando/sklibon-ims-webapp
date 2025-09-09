import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/utils";
import { Heading } from "./heading";
import { Subheading } from "./subheading";

interface HeadingWithWrapperProps extends ComponentProps<"div"> {
  heading: string;
  subheading: string;
}

export const HeadingWithWrapper = ({
  heading,
  subheading,
  className,
  ...props
}: HeadingWithWrapperProps) => {
  return (
    <div {...props} className={cn("text-center", className)}>
      <Heading>{heading}</Heading>
      <Subheading>{subheading}</Subheading>
    </div>
  );
};
