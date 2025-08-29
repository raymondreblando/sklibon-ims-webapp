import type { SidebarItemProps } from "@/types";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";

export const NavItem = ({ item }: { item: SidebarItemProps }) => {
  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild>
        <Link to={item.url}>
          {item.icon && <item.icon className="h-12 w-12" />}
          <span className="text-base font-medium">{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
