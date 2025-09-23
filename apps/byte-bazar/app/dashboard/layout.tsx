"use client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Separator } from "../../../../packages/ui/src/components";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../../../../packages/ui/src/components/sidebar";
import NavigationBreadCrumb from "../../components/navigation-breadcrumb";
import AdminSidebar from "../../components/side-bar";

export default withPageAuthRequired(function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="max-w-7xl mx-auto flex-grow">
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <NavigationBreadCrumb />
            </div>
          </header>

          {children}
        </SidebarInset>
      </main>
    </SidebarProvider>
  );
});
