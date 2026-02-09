"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

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
              className="mx-auto w-auto h-auto"
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <RenderSidebarLinks />

        <SidebarGroup>
          {/* <SidebarGroupLabel>Third Party</SidebarGroupLabel> */}
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="h-auto py-2 hover:bg-transparent bg-transparent"
              >
                <Link href="https://www.scrippyhub.com/" target="_blank">
                  <Image
                    src="/scrippye.png"
                    width={100}
                    height={40}
                    alt="Scrippy Hub"
                    className="w-28 h-auto"
                  />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SignOutBtn />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
