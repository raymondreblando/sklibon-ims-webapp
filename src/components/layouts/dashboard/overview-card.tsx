import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/utils";

import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Heading, Subheading } from "@/components/headings";

export interface OverviewCardProps {
  title: string;
  icon: LucideIcon;
  iconWrapperProps: ComponentProps<"div">;
  count: number;
  description: string;
}

export const OverviewCard = ({
  title,
  icon,
  iconWrapperProps,
  count,
  description,
}: OverviewCardProps) => {
  const Icon = icon;

  return (
    <Card className="gap-0 space-y-3 p-8">
      <div className="flex flex-wrap-reverse items-center justify-between">
        <Heading className="font-semibold">
          {title}
        </Heading>
        <div
          {...iconWrapperProps}
          className={cn(
            "grid h-11 w-11 place-items-center rounded-full",
            iconWrapperProps.className,
          )}
        >
          <Icon />
        </div>
      </div>
      <Heading variant="lg" className="text-xl font-bold md:text-5xl">
        {count}
      </Heading>
      <Subheading className="text-xs md:text-sm">{description}</Subheading>
    </Card>
  );
};
