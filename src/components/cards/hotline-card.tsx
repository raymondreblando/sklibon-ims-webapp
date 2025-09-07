import { PhoneIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { CopyButton } from "@/components/buttons";
import { Heading, Subheading } from "@/components/headings";

interface HotlineCardProps {
  name: string;
  hotline: string;
}

export const HotlineCard = ({ name, hotline }: HotlineCardProps) => {
  return (
    <Card className="flex flex-row items-center justify-start gap-x-4 p-4 shadow-none">
      <div className="bg-primary text-primary-foreground grid min-h-16 min-w-16 place-content-center rounded-md">
        <PhoneIcon />
      </div>
      <div>
        <Heading className="mb-1 text-sm md:text-lg">{name}</Heading>
        <Subheading className="font-semibold md:text-sm">{hotline}</Subheading>
      </div>
      <CopyButton value={hotline} />
    </Card>
  );
};
