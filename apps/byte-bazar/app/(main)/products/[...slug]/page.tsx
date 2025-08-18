interface ProductDynamicZoneProps {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductDynamicZone({
  params,
  searchParams,
}: ProductDynamicZoneProps) {
  const { slug } = await params;

  return <div>Página no encontrada</div>;
}
