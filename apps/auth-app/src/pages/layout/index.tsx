import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router";
import { Toaster } from "../../../../../packages/ui/src/components";
import Footer from "../../components/layout/footer";
import Navbar from "../../components/layout/nav-bar";

const Layout = () => {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <main className="min-h-[90vh] max-w-6xl mx-auto flex flex-col justify-center items-center">
          <Outlet />
          <Toaster />
        </main>
        <Footer />
      </QueryClientProvider>
    </>
  );
};

export default Layout;
