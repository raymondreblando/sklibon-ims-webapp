import { cn } from "@/lib/utils/utils";

import { Heading, Subheading } from "@/components/headings";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const officials: Array<{
  name: string;
  profile: string;
  position: string;
  className?: string;
}> = [
  {
    name: "Iya Vhihelica M. Lived",
    profile:
      "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/officials/president.webp",
    position: "President",
    className: "md:col-span-3",
  },
  {
    name: "Jay Mhar B. Madridano ",
    profile:
      "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/officials/vice-president.webp",
    position: "Vice President",
  },
  {
    name: "Tracey Anne Sevilla ",
    profile:
      "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/officials/secretary.webp",
    position: "Secretary",
  },
  {
    name: "Dave Macinas",
    profile:
      "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/officials/treasurer.webp",
    position: "Treasurer",
  },
  {
    name: "Danica Vibar",
    profile:
      "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/officials/auditor.webp",
    position: "Auditor",
  },
  {
    name: "Jefferson Jan D. Lompero",
    profile: "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/officials/pio.webp",
    position: "PIO",
  },
  {
    name: "Cherry P. Velasco",
    profile: "https://ik.imagekit.io/mhkbf5beo/sklibon-ims/officials/sgt.webp",
    position: "Sgt. @ Arms",
  },
];

export const Officials = () => {
  return (
    <div className="mx-auto grid w-[min(100%,1000px)] gap-8 md:grid-cols-3">
      {officials.map((official) => (
        <Card
          key={official.position}
          className={cn("border-0 p-0 shadow-none", official.className)}
        >
          <CardContent className="flex flex-col items-center justify-center gap-y-4">
            <Avatar className="border-primary h-40 w-40 border-4">
              <AvatarImage src={official.profile} />
              <AvatarFallback>{official.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <Heading className="text-sm font-bold md:text-lg">
                {official.name}
              </Heading>
              <Subheading className="font-medium">
                {official.position}
              </Subheading>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
