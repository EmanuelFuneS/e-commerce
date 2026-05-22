import { useMemo } from "react";
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
import { Brand } from "../../../../../lib/types";

interface BrandTableProps {
  brands: Brand[];
  setOpen: (open: boolean) => void;
  setId: (id: string) => void;
}

const BrandTable = ({ brands, setOpen, setId }: BrandTableProps) => {
  const sortedBrands = useMemo(() => {
    return brands.sort((a, b) => b._count.products - a._count.products);
  }, [brands]);

  return (
    <Card className="p-2 h-fit">
      <Table className="">
        <TableCaption>A list of products</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Logo</TableHead>
            <TableHead>Website</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedBrands.map((el, idx) => {
            return (
              <TableRow key={idx}>
                <TableCell className="font-medium">{el.name}</TableCell>
                <TableCell className="font-medium">
                  {el.logo ? "Ready" : "Not Found"}
                </TableCell>
                <TableCell>{el.website ? "Yes" : "No"}</TableCell>
                <TableCell>{el._count.products}</TableCell>
                <TableCell>
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">...</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-12">
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onClick={() => {
                              setId(el.id);
                              setOpen(true);
                            }}
                          >
                            Edit
                          </DropdownMenuItem>
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

export default BrandTable;
