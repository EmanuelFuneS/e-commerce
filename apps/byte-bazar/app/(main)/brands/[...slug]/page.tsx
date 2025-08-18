interface BrandDynamicZoneProps {
  params: { slug: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function BrandDynamicZone({
  params,
  searchParams,
}: BrandDynamicZoneProps) {
  const { slug } = params;

  return <div>Página no encontrada</div>;
}
