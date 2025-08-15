"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";

import SignOutBtn from "./sign-out-btn";
import RenderSidebarLinks from "./render-sidebar-links";

export function DashboardSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Image
              src="/brand-logo.png"
              width={100}
              height={50}
              alt="Brand Logo"
              className="mx-auto"
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <RenderSidebarLinks />
      </SidebarContent>
      <SidebarFooter>
        <SignOutBtn />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
