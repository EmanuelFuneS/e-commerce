"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components";
import { usePathname } from "next/navigation";

const NavigationBreadCrumb = () => {
  const pathname = usePathname();

  const segments = pathname?.split("/").filter(Boolean) || [];
  const [basePath, ...slug] = segments;

  /*   console.log("PATHNAME", pathname);
  console.log("BASEPATH", basePath);
  console.log("SLUG", slug); */
  return (
    <div className="h-[10vh] flex items-center px-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          {basePath && (
            <>
              <BreadcrumbItem className="capitalize">
                <BreadcrumbLink href={`/${basePath}`}>
                  {basePath}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )}
          {slug &&
            slug.length > 0 &&
            slug.map((segment, index) => (
              <>
                <BreadcrumbItem>
                  {index === slug.length - 1 ? (
                    <BreadcrumbPage>
                      {decodeURIComponent(segment)}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={`/${basePath}/${segment}`}>
                      {decodeURIComponent(segment)}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < 1 && <BreadcrumbSeparator />}
              </>
            ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default NavigationBreadCrumb;
