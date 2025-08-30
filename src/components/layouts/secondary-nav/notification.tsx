import { Bell } from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const notifications = [
  {
    url: "/requests",
    content: "Dwayne has been requesting 50 Monoblock chairs.",
  },
  {
    url: "/requests",
    content: "Feeding Program 2025 will be held on September 5, 2025.",
  },
];

export const Notification = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative">
        <Bell className="size-5" />
        <span className="bg-accent absolute -top-1 -right-1 h-3 w-3 rounded-full"></span>
        <span className="bg-accent absolute -top-1 -right-1 h-3 w-3 animate-ping rounded-full"></span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.map((notification) => (
          <DropdownMenuItem
            key={notification.url}
            className="text-muted max-w-3xs font-medium"
            asChild
          >
            <Link to={notification.url}>{notification.content}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
