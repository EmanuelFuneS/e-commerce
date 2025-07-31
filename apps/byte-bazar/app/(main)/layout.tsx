import Footer from "../../components/footer";
import NavBar from "../../components/nav-bar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <main className="max-w-7xl mx-auto">{children}</main>
      <Footer />
    </>
  );
}
