import { Subheading } from "@/components/headings";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CardTitle } from "@/components/ui/card";
import { useProfileCard } from "@/contexts/profile-card-context";

export const ProfileCardUser = () => {
  const { user } = useProfileCard();

  return (
    <>
      <Avatar className="border-input absolute -top-20 left-1/2 min-h-36 min-w-36 -translate-x-1/2 border-4">
        <AvatarImage src={user.profile} />
        <AvatarFallback className="bg-primary text-primary-foreground">
          {user.username.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <CardTitle className="text-3xl font-semibold">{user.fullname}</CardTitle>
      <Subheading className="text-lg font-medium">@{user.username}</Subheading>
      <Badge className="normal-case">{`${user.info.barangay?.name} - ${user.info.position?.name}`}</Badge>
    </>
  );
};
