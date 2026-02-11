import Footer from "../../components/layout/footer";
import NavBar from "../../components/nav-bar";
import NavigationBreadCrumb from "../../components/navigation-breadcrumb";
import { isLogged } from "../../lib/auth";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth: boolean = await isLogged();
  return (
    <body className="">
      <NavBar isAuth={isAuth} />
      <main className="w-full max-w-6xl mx-auto grow">
        <NavigationBreadCrumb />
        {children}
      </main>
      <Footer />
    </body>
  );
}
