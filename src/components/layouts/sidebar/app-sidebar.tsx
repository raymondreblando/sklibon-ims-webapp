import { NavMain } from "./nav-main";
import { SidebarLogo } from "./sidebar-logo";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";

export const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
    </Sidebar>
  );
};
