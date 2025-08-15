import { sidebarLinks } from "@/constants";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";

export default function RenderSidebarLinks() {
  // TODO: fetch role and render links
  const role = "user";
  const linkGroups = sidebarLinks[role];
  return (
    <>
      {linkGroups.map((group, index) => (
        <SidebarGroup key={index}>
          <SidebarGroupLabel>{group.groupName}</SidebarGroupLabel>
          <SidebarMenu>
            {group.links.map((link, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton asChild>
                  <Link href={link.href}>
                    <HugeiconsIcon icon={link.icon} />
                    <span>{link.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
