"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import Link from "next/link";
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
  },
  {
    title: "Clients",
    url: "/dashboard/clients",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "/dashboard/",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/dashboard/",
    icon: Settings,
  },
];

const AdminSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Byte Bazar</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {itemsTest.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            {/** --------------------------------------- */}
            <SidebarGroupContent />
            <SidebarGroupAction>
              <ThemeToggle size={20} />
            </SidebarGroupAction>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;
