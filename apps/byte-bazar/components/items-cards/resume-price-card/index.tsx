"use client";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Label,
  Separator,
} from "../../../../../packages/ui/src/components";

interface TotalCardProps {
  subtotal?: number;
  shipping?: number;
  formId?: string;
}

const TotalCard = ({ subtotal, shipping, formId }: TotalCardProps) => {
  const total = subtotal && shipping ? subtotal + shipping : null;
  return (
    <Card className="w-full md:w-[40%]">
      <CardHeader>
        <CardTitle>Total</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {subtotal && (
          <div className="flex justify-between">
            <Label>Subtotal:</Label>
            <Label>{subtotal}</Label>
          </div>
        )}
        <Separator />
        {subtotal && (
          <div className="flex justify-between">
            <Label>Shipping:</Label>
            <Label>{shipping}</Label>
          </div>
        )}
        <Separator />
        {total && (
          <div className="flex justify-between">
            <Label>Total:</Label>
            <Label>{total}</Label>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button type="submit" form={formId} className="w-full">
          Process To Checkout
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TotalCard;
