import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../../../../packages/ui/src/components/card";
import { Label } from "../../../../../packages/ui/src/components/label";

const ProductCard = () => {
  return (
    <Card>
      <CardHeader>discount, save favorite</CardHeader>
      <CardContent>image</CardContent>
      <CardFooter>
        <Label>Name</Label>
        <Label>Price</Label>
        <Label>stars</Label>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
