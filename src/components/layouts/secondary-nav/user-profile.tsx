import type { JSX } from "react";
import { Link } from "@tanstack/react-router";
import { ImageUp, LogOut, User, type LucideIcon } from "lucide-react";

import { useLogout } from "@/hooks/auth/use-logout";
import { getAuthUser } from "@/lib/utils/auth";

import { ChangePasswordDialog } from "@/components/modals";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProfileMenu {
  title?: string;
  icon?: LucideIcon;
  url?: string;
  action?: () => void;
  modal?: () => JSX.Element;
}

export const UserProfile = () => {
  const authUser = getAuthUser();
  const username = authUser?.username;
  const profile = authUser?.profile;

  const { handleSignOut } = useLogout();

  const menus: ProfileMenu[] = [
    {
      title: "My Profile",
      url: "/profile",
      icon: User,
    },
    {
      title: "Change Profile",
      url: "/profile",
      icon: ImageUp,
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-7 w-7">
          <AvatarImage src={profile as string} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {username?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="p-0 pb-1">
        <div className="flex items-center gap-x-3 p-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={profile as string} />
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
            <menu.modal />
          ) : (
            <DropdownMenuItem
              key={menu.title}
              className="group text-muted rounded-none px-4 py-2 font-medium"
              onClick={menu.action}
            >
              {menu.icon && (
                <menu.icon className="text-muted group-hover:text-accent-foreground" />
              )}
              {menu.url ? <Link to={menu.url}>{menu.title}</Link> : menu.title}
            </DropdownMenuItem>
          ),
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
