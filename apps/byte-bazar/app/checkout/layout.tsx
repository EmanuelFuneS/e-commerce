import Footer from "../../components/footer";
import NavBar from "../../components/nav-bar";
import NavigationBreadCrumb from "../../components/navigation-breadcrumb";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <main className="w-full max-w-6xl mx-auto md:px-4 grow">
        <NavigationBreadCrumb />
        {children}
      </main>
      <Footer />
    </>
  );
}
