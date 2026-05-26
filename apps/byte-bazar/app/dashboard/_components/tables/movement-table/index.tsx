import {
  Card,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../../../../packages/ui/src/components";
import {
  StockMovement,
  StockMovementType,
  StockMovementTypeLabels,
} from "../../../../../lib/types";

interface MovementTableProps {
  movements: StockMovement[];
}

const MovementTable = ({ movements }: MovementTableProps) => {
  console.log("movements", movements);

  return (
    <Card className="p-2 h-fit">
      <Table className="">
        <TableCaption>A list of products</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">ID</TableHead>
            <TableHead className="w-25">Type</TableHead>
            <TableHead>Create At</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="">Reason</TableHead>
            <TableHead>Product</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movements.map((el, idx) => {
            return (
              <TableRow key={idx}>
                <TableCell className="font-medium">{el.id}</TableCell>
                <TableCell className="font-medium">
                  {StockMovementTypeLabels[StockMovementType[el.type]]}
                </TableCell>
                <TableCell className="">
                  {new Intl.DateTimeFormat("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                  }).format(el.createAt)}
                </TableCell>
                <TableCell>{el.quantity}</TableCell>
                <TableCell>{el.reason}</TableCell>
                <TableCell className="">{el.product.name}</TableCell>
                <TableCell>
                  {/* <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">...</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-12">
                        <DropdownMenuGroup>
                          <DropdownMenuItem>View</DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link href={`inventory/products/${el.slug}`}>
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Disable</DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div> */}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    </Card>
  );
};

export default MovementTable;
