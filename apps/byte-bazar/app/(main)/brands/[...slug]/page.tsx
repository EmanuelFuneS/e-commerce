interface ProductDynamicZoneProps {
  params: { slug: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ProductDynamicZone({
  params,
  searchParams,
}: ProductDynamicZoneProps) {
  const { slug } = params;

  return <div>Página no encontrada</div>;
}
