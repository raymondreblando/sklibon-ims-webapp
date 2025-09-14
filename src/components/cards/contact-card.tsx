import { Card } from "@/components/ui/card";
import { CopyButton } from "@/components/buttons";
import { Heading, Subheading } from "@/components/headings";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ContactCardProps {
  name: string;
  profile: string;
  position: string;
  barangay: string;
  contactNumber: string;
}

export const ContactCard = ({
  name,
  profile,
  position,
  barangay,
  contactNumber,
}: ContactCardProps) => {
  return (
    <Card className="p-4 shadow-none md:p-6">
      <div className="flex items-center gap-x-4">
        <Avatar className="h-14 w-14">
          <AvatarImage src={profile ?? ""} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <Heading className="mb text-sm md:text-lg">{name}</Heading>
          <Subheading className="font-semibold md:text-sm">{`${barangay}, ${position}`}</Subheading>
        </div>
      </div>
      <div className="bg-input flex items-center gap-4 rounded-md px-3 py-2">
        <p className="text-sm font-semibold">{contactNumber}</p>
        <CopyButton
          className="h-6 w-6 rounded-md bg-white"
          iconProps={{ className: "size-3" }}
          value={contactNumber}
        />
      </div>
    </Card>
  );
};
