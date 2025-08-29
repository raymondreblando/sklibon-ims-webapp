import { ROLES } from "@/constants";
import type { SidebarItemProps } from "@/types";
import {
  Award,
  Calendar,
  FileChartColumn,
  Image,
  LandPlot,
  Layers,
  LayoutGrid,
  Server,
  Settings2,
  Users,
} from "lucide-react";

export const items: SidebarItemProps[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    authorize: [ROLES.SUPERADMIN, ROLES.ADMIN],
    icon: LayoutGrid,
    isActive: true,
  },
  {
    title: "Requests",
    url: "/requests",
    authorize: [ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.USER],
    icon: Server,
    isActive: false,
  },
  {
    title: "Events",
    url: "/events",
    authorize: [ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.USER],
    icon: Calendar,
    isActive: false,
  },
  {
    title: "Galleries",
    url: "/galleries",
    authorize: [ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.USER],
    icon: Image,
    isActive: false,
  },
  {
    title: "Attendances",
    url: "/attendances",
    authorize: [ROLES.USER],
    icon: LandPlot,
    isActive: false,
  },
  {
    title: "Reports",
    url: "/reports",
    authorize: [ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.USER],
    icon: FileChartColumn,
    isActive: false,
  },
  {
    title: "Users",
    url: "/users",
    authorize: [ROLES.SUPERADMIN, ROLES.ADMIN],
    icon: Users,
    isActive: false,
  },
  {
    title: "Setups",
    url: "#",
    authorize: [ROLES.SUPERADMIN, ROLES.ADMIN],
    icon: Settings2,
    isActive: false,
    items: [
      {
        title: "Positions",
        url: "/positions",
        icon: Award,
      },
      {
        title: "Request Types",
        url: "/request-types",
        icon: Layers,
      },
    ],
  },
];
