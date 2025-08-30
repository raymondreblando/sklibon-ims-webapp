import { cn } from "@/lib/utils/utils";

import { Chat } from "./chat";
import { UserProfile } from "./user-profile";
import { Notification } from "./notification";
import { BreadcrumbBuilder } from "@/components/ui/breadcrumb-builder";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const SecondaryNav = () => {
  return (
    <nav
      className={cn(
        "border-input shadow-background-muted flex w-full items-center justify-between border-b px-4 py-6 shadow-sm",
      )}
    >
      <div className="flex items-center gap-x-4">
        <SidebarTrigger className="hover:text-foreground hover:bg-transparent" />
        <Separator
          orientation="vertical"
          className="data-[orientation=vertical]:h-4"
        />
        <BreadcrumbBuilder />
      </div>
      <div className="flex items-center gap-x-4">
        <Notification />
        <Chat />
        <UserProfile />
      </div>
    </nav>
  );
};
