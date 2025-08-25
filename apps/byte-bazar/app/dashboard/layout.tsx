import {
  SidebarProvider,
  SidebarTrigger,
} from "../../../../packages/ui/src/components/sidebar";
import AdminSidebar from "../../components/side-bar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarTrigger />
      <main className="max-w-7xl mx-auto flex-grow">{children}</main>
    </SidebarProvider>
  );
}
