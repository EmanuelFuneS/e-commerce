import { redirect } from "next/navigation";
import { Separator } from "../../../../packages/ui/src/components";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../../../../packages/ui/src/components/sidebar";
import NavigationBreadCrumb from "../../components/navigation-breadcrumb";
import AdminSidebar from "../../components/side-bars/admin-sidebar";
import { isLogged } from "../../lib/auth";

export default /* withPageAuthRequired( */ async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth: boolean = await isLogged();
  if (!isAuth) redirect("/auth/login");
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="max-w-7xl mx-auto grow">
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
} /* ) */
