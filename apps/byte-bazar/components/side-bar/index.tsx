"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@workspace/ui/components";
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
    items: [
      {
        title: "Add Products",
        url: "#",
      },
      {
        title: "Explorer",
        url: "#",
      },
      {
        title: "Delete",
        url: "#",
      },
    ],
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
                <Collapsible>
                  <SidebarMenuItem key={item.title}>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton asChild>
                        <Link href={item.url}>
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <a href={subItem.url}>
                                <span>{subItem.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupLabel>Options</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <ThemeToggle size={20} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
