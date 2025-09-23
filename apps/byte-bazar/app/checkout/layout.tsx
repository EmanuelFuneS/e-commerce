import NavigationBreadCrumb from "../../components/navigation-breadcrumb";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="max-w-7xl mx-auto">
        <NavigationBreadCrumb />
        {children}
      </main>
    </>
  );
}
