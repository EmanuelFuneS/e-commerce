import Footer from "../../components/footer";
import NavBar from "../../components/nav-bar";
import NavigationBreadCrumb from "../../components/navigation-breadcrumb";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className="">
      <NavBar />
      <main className="max-w-6xl mx-auto md:px-4 flex-grow">
        <NavigationBreadCrumb />
        {children}
      </main>
      <Footer />
    </body>
  );
}
