import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/utils";
import { Heading, type HeadingProps } from "./heading";
import { Subheading } from "./subheading";

interface HeadingWithWrapperProps extends ComponentProps<"div"> {
  heading: string;
  subheading: string;
  headingProps?: HeadingProps;
  subheadingProps?: ComponentProps<"p">;
}

export const HeadingWithWrapper = ({
  heading,
  subheading,
  className,
  headingProps,
  subheadingProps,
  ...props
}: HeadingWithWrapperProps) => {
  return (
    <div {...props} className={cn("text-center", className)}>
      <Heading variant="lg" {...headingProps}>
        {heading}
      </Heading>
      <Subheading {...subheadingProps}>{subheading}</Subheading>
    </div>
  );
};
