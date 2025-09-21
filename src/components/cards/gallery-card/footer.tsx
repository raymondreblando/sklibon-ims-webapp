import { useMemo } from "react";
import { Link } from "@tanstack/react-router";

import { ClapperboardIcon, PencilIcon, TrashIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardFooter } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FooterProps {
  id: string;
  name: string;
  position: string;
  profile: string | undefined;
  onDelete: (id: string) => void;
  hasAction: boolean;
}

export const Footer = ({
  id,
  name,
  position,
  profile,
  onDelete,
  hasAction,
}: FooterProps) => {
  const actions = useMemo(() => {
    return [
      {
        Icon: ClapperboardIcon,
        label: "View Gallery",
        href: `/gallery/${id}/view`,
        show: true,
      },
      {
        Icon: PencilIcon,
        label: "Edit Gallery",
        href: `/galleries/${id}/edit`,
        show: hasAction,
      },
      {
        Icon: TrashIcon,
        label: "Delete Gallery",
        onDelete: onDelete,
        show: hasAction,
      },
    ];
  }, [onDelete, hasAction, id]);

  return (
    <CardFooter className="flex items-center justify-between p-0">
      <div className="flex items-center gap-x-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={profile} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-semibold">{name}</p>
          <p className="text-muted text-[10px] font-medium">{position}</p>
        </div>
      </div>
      <div className="text-muted flex items-center gap-x-2">
        {actions.map(
          (action) =>
            action.show && (
              <Tooltip key={`${action.label}-${id}`}>
                <TooltipTrigger className="cursor-pointer" asChild>
                  {action.href ? (
                    <Link to={action.href}>
                      <action.Icon size={16} />
                    </Link>
                  ) : (
                    <action.Icon
                      onClick={() => action.onDelete?.(id)}
                      size={16}
                    />
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  <p>{action.label}</p>
                </TooltipContent>
              </Tooltip>
            ),
        )}
      </div>
    </CardFooter>
  );
};
