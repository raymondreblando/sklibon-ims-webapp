import { cn } from "@/lib/utils/utils";
import type { ComponentProps } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import type {
  AvatarFallbackProps,
  AvatarImageProps,
  AvatarProps,
} from "@radix-ui/react-avatar";

interface TableUserProfileProps extends ComponentProps<"div"> {
  user: {
    name: string;
    subtitle: string;
    profile: string;
  };
  avatarProps?: AvatarProps & React.RefAttributes<HTMLSpanElement>;
  avatarImageProps?: AvatarImageProps & React.RefAttributes<HTMLImageElement>;
  avatarFallbackProps?: AvatarFallbackProps &
    React.RefAttributes<HTMLSpanElement>;
}

export const TableUserProfile = ({
  user,
  className,
  avatarProps,
  avatarImageProps,
  avatarFallbackProps,
  ...props
}: TableUserProfileProps) => {
  return (
    <div className={cn("flex items-center gap-x-3", className)} {...props}>
      <Avatar
        {...avatarProps}
        className={cn("h-10 w-10", avatarProps?.className)}
      >
        <AvatarImage {...avatarImageProps} src={user.profile} />
        <AvatarFallback
          {...avatarFallbackProps}
          className={cn(
            "bg-primary text-primary-foreground",
            avatarFallbackProps?.className,
          )}
        >
          {user.name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="text-foreground text-sm font-semibold">{user.name}</p>
        <p className="text-muted text-xs font-medium">@{user.subtitle}</p>
      </div>
    </div>
  );
};
