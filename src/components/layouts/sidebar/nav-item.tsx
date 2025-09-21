import type { SidebarItemProps } from "@/types";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";

export const NavItem = ({ item }: { item: SidebarItemProps }) => {
  const { open } = useSidebar();
  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton
        tooltip={{ children: item.title, hidden: !!open }}
        asChild
      >
        <Link
          to={item.url}
          activeProps={{ className: "group active text-primary font-semibold" }}
        >
          {item.icon && (
            <item.icon className="h-12 w-12 group-[.active]:stroke-2" />
          )}
          <span className="text-base font-medium group-[.active]:font-semibold">
            {item.title}
          </span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
