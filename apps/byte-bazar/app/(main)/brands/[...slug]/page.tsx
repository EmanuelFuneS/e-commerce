interface BrandDynamicZoneProps {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BrandDynamicZone({
  params,
  searchParams,
}: BrandDynamicZoneProps) {
  const { slug } = await params;

  return <div>Página no encontrada</div>;
}
