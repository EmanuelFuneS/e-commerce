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
import { Calendar, ChevronRight, Home, Inbox, Search } from "@workspace/ui/lib";
import { Settings } from "lucide-react";
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
    isActive: true,
    items: [
      {
        title: "Add Products",
        url: "#",
      },
      {
        title: "Delete",
        url: "#",
      },
      {
        title: "Explorer",
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
      <SidebarContent className="py-10">
        <SidebarGroup>
          <SidebarGroupLabel>Admin Byte Bazar</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {itemsTest.map((item) =>
                item.items ? (
                  <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={item.isActive}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem key={item.title}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton asChild>
                          {/* {item.icon && <item.icon />} */}
                          <Link href={item.url}>
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
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
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="pb-20">
        <SidebarGroup>
          <SidebarGroupLabel>Options</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <div className="w-full px-2">
                <ThemeToggle size={20} />
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
