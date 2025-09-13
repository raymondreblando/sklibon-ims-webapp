import { Heading } from "@/components/headings";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ProfileCardUser } from "./profile-card-user";
import { useProfileCard } from "@/contexts/profile-card-context";

export const ProfileCard = () => {
  const { items } = useProfileCard();

  return (
    <Card className="mx-auto max-w-[640px] border-0 pt-20 shadow-none md:pt-32">
      <CardHeader className="border-input relative flex flex-col items-center justify-center gap-y-2 rounded-md border pt-20 pb-8">
        <ProfileCardUser />
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4 px-0">
        {items.map((item, index) => (
          <div
            key={`${item.heading}-${index}`}
            className="border-input rounded-md border"
          >
            <Heading className="border-input border-b px-6 py-4">
              {item.heading}
            </Heading>
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
