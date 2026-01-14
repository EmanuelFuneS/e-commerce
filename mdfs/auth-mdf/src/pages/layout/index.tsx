import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <nav></nav>
      <main className="min-h-screen max-w-6xl mx-auto flex flex-col justify-center items-center">
        {children}
      </main>
      <footer></footer>
    </>
  );
};

export default Layout;
