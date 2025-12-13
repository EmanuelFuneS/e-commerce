import { Label } from "@workspace/ui/components";
import Link from "next/link";
import ProductTable from "../../../components/tables/products-table";
import { getProducts } from "../../../lib/actions";

const Page = async () => {
  const products = await getProducts();

  return (
    <div className="w-full p-2">
      <div className="my-4">
        <Label className="text-3xl">Inventory</Label>
      </div>
      <div className="py-4 flex justify-end items-center ">
        <Link href="/dashboard/inventory/add-products">Add Product</Link>
      </div>
      <div>
        <ProductTable data={products?.data} />
      </div>
    </div>
  );
};

export default Page;
