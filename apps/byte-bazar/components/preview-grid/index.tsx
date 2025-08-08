import { Button, Label } from "@workspace/ui/components/";
import Link from "next/link";
import { Brand } from "../../lib/types/brands";
import { Product } from "../../lib/types/products";
import BrandCard from "../items-cards/brand-card";
import ProductCard from "../items-cards/product-card";

interface PreviewGridProps {
  dataType: "brands" | "products";
  brands?: Brand[];
  products?: Product[];
}

const PreviewGrid = ({
  dataType,
  brands = [],
  products = [],
}: PreviewGridProps) => {
  const testItemsArray = new Array(5).fill("");
  return (
    <section className=" flex flex-col items-center  w-full">
      <div className="w-full h-8 flex justify-start items-center">
        <Label className="capitalize">{dataType}</Label>
      </div>
      <div className="w-full max-w-6xl mx-auto">
        <div className="px-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 w-full">
          {products!.map((e, index: number) => (
            <ProductCard key={index} data={e} />
          ))}
          {dataType === "brands" &&
            brands!.map((e, index: number) => (
              <BrandCard key={index} data={e} />
            ))}
        </div>
      </div>
      <div className="mt-4">
        {dataType === "products" ? (
          <Link href={"/products"}>
            <Button>View All Products</Button>
          </Link>
        ) : (
          <Link href={"/brands"}>
            <Button>View All Brands</Button>
          </Link>
        )}
      </div>
    </section>
  );
};

export default PreviewGrid;
