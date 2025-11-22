"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Building2,
  Users,
  Settings,
  BarChart3,
} from "lucide-react";

import { NavMain } from "@/components/layout/dashboard/nav-main";
import { NavUser } from "@/components/layout/dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "/avatars/alex.jpg",
  },
  teams: [],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Tenants",
      url: "/_dashboard/tenants",
      icon: Building2,
    },
    {
      title: "Users",
      url: "/users",
      icon: Users,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
    {
      title: "Reports",
      url: "/reports",
      icon: BarChart3,
    },
  ],
  bottomNav: [
    // {
    //   title: "Help",
    //   url: "/help",
    //   icon: HelpCircle,
    // },
    // {
    //   title: "Logout",
    //   url: "/logout",
    //   icon: LogOut,
    // },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="px-2 py-2">
          <h1 className="text-lg font-semibold">Campus OS</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      {data.bottomNav.length > 0 || data.user ? (
        <SidebarFooter>
          <NavMain items={data.bottomNav} />
          <NavUser user={data.user} />
        </SidebarFooter>
      ) : null}
      <SidebarRail />
    </Sidebar>
  );
}
