import { items } from "./items";

import { NavItem } from "./nav-item";
import { NavCollapsible } from "./nav-collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";

export const NavMain = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menus</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) =>
          item.items ? <NavCollapsible item={item} /> : <NavItem item={item} />,
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
};
