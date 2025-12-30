"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components";
import { Calendar, Home, Inbox } from "@workspace/ui/lib";
import { Settings } from "lucide-react";
import Link from "next/link";
import ProfilePicture from "../profile/profile-picture";
import ThemeToggle from "../theme-toggle";

const itemsTest = [
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: Home,
  },
  {
    title: "Inventory",
    url: "/dashboard/inventory",
    icon: Inbox,
    isActive: true,
  },
  {
    title: "Clients",
    url: "/dashboard/clients",
    icon: Calendar,
  },
  {
    title: "Orders",
    url: "/dashboard/orders",
    icon: Calendar,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

const AdminSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarGroupContent>
          <SidebarMenu>
            <div className="flex flex-row gap-4 w-full px-2">
              <ThemeToggle size={30} />
              <ProfilePicture />
            </div>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarHeader>
      <SidebarContent className="">
        <SidebarGroup>
          <SidebarGroupLabel>Admin Byte Bazar</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {itemsTest.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon className="mr-1" size={16} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;
