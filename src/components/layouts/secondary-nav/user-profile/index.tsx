import { useState } from "react";
import { LogOut, User } from "lucide-react";

import { useLogout } from "@/hooks/auth/use-logout";
import { getAuthUser } from "@/lib/utils/auth";
import { useUserProfilePicQuery } from "@/hooks/queries/use-users-query";

import { ProfileMenuItem } from "./profile-menu-item";
import { ChangePasswordDialog, ChangeProfileDialog } from "@/components/modals";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const UserProfile = () => {
  const { data: profile } = useUserProfilePicQuery();
  const [open, setOpen] = useState(false);
  const authUser = getAuthUser();
  const username = authUser?.username;

  const { handleSignOut } = useLogout();

  const menus: ProfileMenuItem[] = [
    {
      title: "My Profile",
      url: "/profile",
      icon: User,
    },
    {
      title: "Change Profile Picture",
      modal: ChangeProfileDialog,
    },
    {
      title: "Account Security",
      modal: ChangePasswordDialog,
    },
    {
      title: "Sign Out",
      icon: LogOut,
      action: handleSignOut,
    },
  ];

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-7 w-7">
          <AvatarImage src={profile ?? ""} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {username?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="p-0 pb-1">
        <div className="flex items-center gap-x-3 p-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={profile ?? ""} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {username?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold normal-case">{`${authUser?.info.firstname} ${authUser?.info.lastname}`}</p>
            <p className="text-muted text-sm font-medium">
              {authUser?.role.role}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        {menus.map((menu) =>
          menu.modal ? (
            <menu.modal key={menu.title} setDropdownOpen={setOpen} />
          ) : (
            <ProfileMenuItem
              key={menu.title}
              title={menu.title}
              icon={menu.icon}
              url={menu.url}
              action={menu.action}
              onClose={() => setOpen(false)}
            />
          ),
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
