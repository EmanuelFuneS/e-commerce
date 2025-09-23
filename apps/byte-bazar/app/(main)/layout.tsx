import Footer from "../../components/footer";
import NavBar from "../../components/nav-bar";
import Navigation from "../../components/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className="">
      <NavBar />
      <Navigation />
      <main className="max-w-6xl mx-auto md:px-4 flex-grow">{children}</main>
      <Footer />
    </body>
  );
}
