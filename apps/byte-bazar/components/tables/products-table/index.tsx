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
} from "@workspace/ui/components";
import Link from "next/link";
import { Product } from "../../../lib/types";

interface ProductTableProps {
  data: Product[];
}

const ProductTable = ({ data }: ProductTableProps) => {
  return (
    <Card className="p-2 h-fit">
      <Table className="">
        <TableCaption>A list of products</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>isActive</TableHead>
            <TableHead className="">Images</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((el, idx) => {
            return (
              <TableRow key={idx}>
                <TableCell className="font-medium">{el.name}</TableCell>
                <TableCell className="">{el.price}</TableCell>
                <TableCell>{el.stock}</TableCell>
                <TableCell>{el.isActive}</TableCell>
                <TableCell className="">{el.images?.length}</TableCell>
                <TableCell>
                  <div>
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

export default ProductTable;
