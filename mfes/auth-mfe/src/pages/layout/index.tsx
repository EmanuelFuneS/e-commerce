import React from "react";
import Footer from "../../components/layout/footer";
import Navbar from "../../components/layout/nav-bar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <main className="min-h-[90vh] max-w-6xl mx-auto flex flex-col justify-center items-center">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
