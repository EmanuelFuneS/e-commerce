import { getProducts } from "@/src/actions/product.actions";
import { Card, Label } from "@workspace/ui/components";
import Link from "next/link";
import SearchItems from "../../../components/search-items";
import ProductTable from "../../../components/tables/products-table";

export const dynamic = "force-dynamic";
const Page = async () => {
  const products = await getProducts();

  return (
    <div className="w-full h-full space-y-4 p-2">
      <div className="my-4">
        <Label className="text-3xl">Inventory</Label>
      </div>
      <Card className="flex flex-row justify-between px-4 items-center ">
        <SearchItems />
        <div>
          <Link href="/dashboard/inventory/movements" className="mr-4">
            Movements
          </Link>
          <Link href="/dashboard/inventory/brands" className="mr-4">
            Brands
          </Link>
          <Link href="/dashboard/inventory/products">Add Product</Link>
        </div>
      </Card>
      <div>
        <ProductTable
          data={Array.isArray(products?.data) ? products.data : []}
        />
      </div>
    </div>
  );
};

export default Page;
