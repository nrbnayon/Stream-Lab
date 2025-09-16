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
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeAuth } from "@/redux/store/slices/authSlice";

export default function RenderSidebarLinks() {
  const dispatch = useDispatch();
  const { role, isAuthenticated } = useSelector((state) => state.auth);
  const pathname = usePathname();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  if (!isAuthenticated || !role) return null;

  const linkGroups = sidebarLinks[role];

  // Don't render if no link groups found for the role
  if (!linkGroups) return null;

  return (
    <>
      {linkGroups.map((group, index) => (
        <SidebarGroup key={index}>
          <SidebarGroupLabel>{group.groupName}</SidebarGroupLabel>
          <SidebarMenu>
            {group.links.map((link, linkIndex) => {
              const isActive =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <SidebarMenuItem key={linkIndex}>
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
