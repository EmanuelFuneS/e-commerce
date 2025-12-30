import {
  Card,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../../packages/ui/src/components";
import { StockMovement, StockMovementType } from "../../../lib/types";

interface MovementTableProps {
  movements: StockMovement[];
}

const MovementTable = ({ movements }: MovementTableProps) => {
  return (
    <Card className="p-2 h-fit">
      <Table className="">
        <TableCaption>A list of products</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead className="w-[100px]">Type</TableHead>
            <TableHead>Create At</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="">Reason</TableHead>
            <TableHead>Product</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movements.map((el, idx) => {
            return (
              <TableRow>
                <TableCell className="font-medium">{el.id}</TableCell>
                <TableCell className="font-medium">
                  {StockMovementType[el.type]}
                </TableCell>
                <TableCell className="">
                  {el.createAt.toLocaleDateString()}
                </TableCell>
                <TableCell>{el.quantity}</TableCell>
                <TableCell>{el.reason}</TableCell>
                <TableCell className="">{el.productId}</TableCell>
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
