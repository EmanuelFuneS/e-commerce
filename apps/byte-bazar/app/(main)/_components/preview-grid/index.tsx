import { Button, Label } from "@workspace/ui/components/";
import Link from "next/link";
import { Brand } from "../../../../lib/types/brands";
import { Product } from "../../../../lib/types/products";
import BrandCard from "../../../../components/items-cards/brand-card";
import ProductCard from "../../../../components/items-cards/product-card";

interface PreviewGridProps {
  dataType: "brands" | "products";
  brands?: Brand[];
  products?: Product[];
}

const PreviewGrid = ({ dataType, brands, products }: PreviewGridProps) => {
  return (
    <section className=" flex flex-col items-center  w-full">
      <div className="w-full h-8 flex justify-start items-center">
        <Label className="capitalize text-3xl">{dataType}</Label>
      </div>
      <div className="w-full max-w-6xl my-4 mx-auto">
        <div className="px-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 w-full">
          {products?.map((e, index: number) => (
            <ProductCard key={index} data={e} />
          ))}
          {dataType === "brands" &&
            brands?.map((e, index: number) => (
              <BrandCard key={index} data={e} />
            ))}
        </div>
      </div>
      <div className="mt-4 shadow-lg hover:scale-105 transform transition-transform duration-300">
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
