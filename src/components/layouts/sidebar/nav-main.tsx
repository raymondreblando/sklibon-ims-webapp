import { items } from "./items";
import { getAuthUser } from "@/lib/utils/auth";

import { NavItem } from "./nav-item";
import { NavCollapsible } from "./nav-collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";

export const NavMain = () => {
  const role = getAuthUser()?.role.role;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menus</SidebarGroupLabel>
      <SidebarMenu>
        {items.map(
          (item) =>
            item.authorize.includes(role as string) &&
            (item.items ? (
              <NavCollapsible key={item.title} item={item} />
            ) : (
              <NavItem key={item.title} item={item} />
            )),
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
};
