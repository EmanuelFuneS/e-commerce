import Footer from "../../components/layout/footer";
import NavBar from "../../components/layout/nav-bar";
import NavigationBreadCrumb from "../../components/navigation-breadcrumb";

export default function SettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar isAuth />
      {/* <ProfileSidebar subHeader={}></ProfileSidebar> */}
      <main className="w-full max-w-6xl mx-auto grow">
        <NavigationBreadCrumb />
        {children}
      </main>
      <Footer />
    </>
  );
}
