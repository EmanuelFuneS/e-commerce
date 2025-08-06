import { Button } from "../../../../packages/ui/src/components/button";
import { Label } from "../../../../packages/ui/src/components/label";
import { Brand } from "../../lib/types/brands";
import { Category } from "../../lib/types/categories";
import { Product } from "../../lib/types/products";
import BrandCard from "../items-cards/brand-card";
import ProductCard from "../items-cards/product-card";

interface PreviewGridProps {
  dataType: "brand" | "category" | "product";
  brands?: Brand[];
  products?: Product[];
  categories?: Category[];
}

const PreviewGrid = ({
  dataType,
  brands,
  categories,
  products,
}: PreviewGridProps) => {
  const testItemsArray = new Array(5).fill("");
  return (
    <section className="flex flex-col items-center gap-3 bg-orange-50 w-full">
      <hgroup className="w-full flex items-center justify-between h-20">
        <div>
          <Label>Label</Label>
          <h2>title</h2>
        </div>
        <span>pagination</span>
      </hgroup>
      <div className="flex justify-between gap-4">
        {dataType === "product" &&
          products!.map((e, index: number) => {
            return <ProductCard key={index} data={e} />;
          })}
        {dataType === "brand" &&
          brands!.map((e, index: number) => {
            return <BrandCard key={index} data={e} />;
          })}
        {dataType === "category" &&
          categories!.map((e, index: number) => {
            return <></>;
          })}
      </div>

      <Button>view All Products</Button>
    </section>
  );
};

export default PreviewGrid;
