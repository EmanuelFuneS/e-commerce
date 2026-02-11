import Footer from "../../components/layout/footer";
import NavBar from "../../components/nav-bar";
import NavigationBreadCrumb from "../../components/navigation-breadcrumb";
import ProfileSidebar from "../../components/side-bars/profile-sidebar";

export default function SettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar isAuth />
      <ProfileSidebar subHeader={<NavigationBreadCrumb />}>
        {children}
      </ProfileSidebar>

      <Footer />
    </>
  );
}
