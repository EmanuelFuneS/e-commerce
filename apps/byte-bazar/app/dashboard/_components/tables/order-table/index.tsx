import Link from "next/link";
import {
  Button,
  Card,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../../../../packages/ui/src/components";
import { Order, OrderStatus } from "../../../../../lib/types";

interface OrderTableProps {
  orders: Order[];
  rol: "admin" | "customer";
}

const OrderTable = ({ orders, rol }: OrderTableProps) => {
  return (
    <Card className="p-2 h-fit">
      <Table className="">
        <TableCaption>A list of products</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">Order Number</TableHead>
            <TableHead className="w-25">Create At</TableHead>
            <TableHead>Items</TableHead>
            <TableHead className="">Sub Total</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((el, idx) => {
            return (
              <TableRow key={idx}>
                <TableCell className="font-medium">{el.orderNumber}</TableCell>
                <TableCell className="font-medium">
                  {el.createdAt.toLocaleDateString()}
                </TableCell>
                <TableCell className="">{el.orderItems.length}</TableCell>
                <TableCell>{el.subtotal}</TableCell>
                <TableCell className="">{el.paymentMethod}</TableCell>
                <TableCell>{OrderStatus[el.status]}</TableCell>
                <TableCell>
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">...</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-12">
                        <DropdownMenuGroup>
                          <DropdownMenuItem>Details</DropdownMenuItem>
                          {rol === "admin" && (
                            <DropdownMenuItem>
                              <Link href={""}>Edit</Link>
                            </DropdownMenuItem>
                          )}
                          {/* <DropdownMenuItem>Disable</DropdownMenuItem> */}
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
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

export default OrderTable;
