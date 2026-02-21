import { redirect } from "next/navigation";
import Footer from "../../components/layout/footer";
import NavBar from "../../components/layout/nav-bar";
import NavigationBreadCrumb from "../../components/navigation-breadcrumb";
import { isLogged } from "../../lib/auth";

export default async function SettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth: boolean = await isLogged();
  if (!isAuth) redirect("/auth/login");
  return (
    <>
      <NavBar isAuth={isAuth} />
      {/* <ProfileSidebar subHeader={}></ProfileSidebar> */}
      <main className="w-full max-w-6xl mx-auto grow">
        <NavigationBreadCrumb />
        {children}
      </main>
      <Footer />
    </>
  );
}
