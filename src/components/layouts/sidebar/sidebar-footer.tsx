import { Link } from "@tanstack/react-router";

import { HouseIcon } from "lucide-react";
import {
  SidebarFooter,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export const AppSidebarFooter = () => {
  return (
    <SidebarFooter>
      <SidebarMenuItem>
        <SidebarMenuButton
          tooltip={{ children: "Homepage", hidden: !!open }}
          asChild
        >
          <Link
            to="/"
            activeProps={{
              className: "group active text-primary font-semibold",
            }}
          >
            <HouseIcon className="h-12 w-12 group-[.active]:stroke-2" />
            <span className="text-base font-medium group-[.active]:font-semibold">
              Homepage
            </span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarFooter>
  );
};
