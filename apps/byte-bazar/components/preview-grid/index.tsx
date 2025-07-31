import { Button } from "../../../../packages/ui/src/components/button";
import { Label } from "../../../../packages/ui/src/components/label";
import ProductCard from "../items-cards/product-card";

const PreviewGrid = () => {
  const testItemsArray = new Array(5).fill("");
  return (
    <div className="flex flex-col items-center gap-3 bg-orange-50 w-full">
      <div className="w-full flex items-center justify-between h-20">
        <div>
          <Label>Label</Label>
          <h2>title</h2>
        </div>
        <div>pagination</div>
      </div>
      <div className="flex justify-between gap-4">
        {testItemsArray.map(() => {
          return <ProductCard />;
        })}
      </div>
      <div>
        <Button>view All Products</Button>
      </div>
    </div>
  );
};

export default PreviewGrid;
