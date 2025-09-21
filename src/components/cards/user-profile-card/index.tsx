import { useProfileCard } from "@/contexts/profile-card-context";

import { Heading } from "@/components/headings";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProfileCardUser } from "./profile-card-user";

export const ProfileCard = () => {
  const { items } = useProfileCard();

  return (
    <Card className="border-input mx-auto my-4 max-w-[640px] rounded-md border-0 shadow-none md:my-8 md:border">
      <CardHeader className="flex flex-col items-center justify-center gap-y-1">
        <ProfileCardUser />
      </CardHeader>
      <CardContent className="flex flex-col p-0">
        {items.map((item, index) => (
          <div key={`${item.heading}-${index}`}>
            <Separator className="bg-input my-2" />
            <Heading className="px-6">{item.heading}</Heading>
            <Separator className="bg-input my-2" />
            <div className="grid gap-6 p-6 md:grid-cols-3">
              {item.items.map((info, infoIndex) => (
                <div
                  key={`${info.label}-${infoIndex}`}
                  className={info.className}
                >
                  <p className="text-muted text-xs font-bold">{info.label}</p>
                  <p className="text-base font-semibold">{info.value}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
