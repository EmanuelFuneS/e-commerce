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
      <main className="w-full max-w-6xl mx-auto grow">
        <NavigationBreadCrumb />
        {children}
      </main>
      <Footer />
    </body>
  );
}
