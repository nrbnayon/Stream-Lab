"use client";
import { sidebarLinks } from "@/constants";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RenderSidebarLinks() {
  const pathname = usePathname();
  // TODO: fetch role and render links
  const role = "user";
  const linkGroups = sidebarLinks[role];
  return (
    <>
      {linkGroups.map((group, index) => (
        <SidebarGroup key={index}>
          <SidebarGroupLabel>{group.groupName}</SidebarGroupLabel>
          <SidebarMenu>
            {group.links.map((link, index) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    asChild
                    variant={isActive ? "active" : "default"}
                  >
                    <Link href={link.href}>
                      {link.icon}
                      <span>{link.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
