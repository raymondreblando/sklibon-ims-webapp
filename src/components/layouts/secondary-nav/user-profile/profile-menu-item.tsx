import { Link } from "@tanstack/react-router";
import type { SetStateAction } from "react";

import { type LucideIcon } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export interface ProfileMenuItemProps {
  title: string;
  onClose: () => void;
  icon?: LucideIcon;
  url?: string;
  action?: () => void;
}

export interface ProfileMenuItem extends Omit<ProfileMenuItemProps, "onClose"> {
  modal?: React.ComponentType<{
    setDropdownOpen: React.Dispatch<SetStateAction<boolean>>;
  }>;
}

export const ProfileMenuItem = ({
  title,
  icon,
  url,
  action,
  onClose,
}: ProfileMenuItemProps) => {
  const handleClick = () => {
    action?.();
    onClose();
  };

  if (url) {
    return (
      <Link to={url} className="w-full">
        <DropdownMenuItem
          className="group text-muted rounded-none px-4 py-2 font-medium"
          onClick={onClose}
        >
          <Content icon={icon} title={title} />
        </DropdownMenuItem>
      </Link>
    );
  }

  return (
    <DropdownMenuItem
      className="group text-muted rounded-none px-4 py-2 font-medium"
      onClick={handleClick}
    >
      <Content icon={icon} title={title} />
    </DropdownMenuItem>
  );
};

const Content = ({
  icon: Icon,
  title,
}: Pick<ProfileMenuItemProps, "icon" | "title">) => {
  return (
    <>
      {Icon && (
        <Icon className="text-muted group-hover:text-accent-foreground pointer-events-none" />
      )}
      <span>{title}</span>
    </>
  );
};
