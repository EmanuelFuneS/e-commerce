import Footer from "../../components/footer";
import NavBar from "../../components/nav-bar";
import NavigationBreadCrumb from "../../components/navigation-breadcrumb";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <main className="max-w-7xl mx-auto md:px-4">
        <NavigationBreadCrumb />
        {children}
      </main>
      <Footer />
    </>
  );
}
