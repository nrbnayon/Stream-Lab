"use client";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { HugeiconsIcon } from "@hugeicons/react";
import { Logout01Icon } from "@hugeicons/core-free-icons/index";

export default function SignOutBtn() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {/* TODO: redirect and add functionality */}
        <SidebarMenuButton className="cursor-pointer">
          <HugeiconsIcon icon={Logout01Icon} className="text-destructive" />
          <span>Sign Out</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
