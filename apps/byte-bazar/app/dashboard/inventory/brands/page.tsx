"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Label,
} from "../../../../../../packages/ui/src/components";
import BrandForm from "../../../../components/forms/brand-form";
import SearchItems from "../../../../components/search-items";
import BrandTable from "../../../../components/tables/brand-table";
import useBrands from "../../../../lib/hooks/useBrands";
import { Brand } from "../../../../lib/types";

const Page = () => {
  const [editId, setEditId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useBrands();
  useEffect(() => {
    console.log(editId);
  }, [editId]);
  if (!data) return <div>Loading...</div>;

  return (
    <section className="w-full h-full space-y-4 p-2">
      <div className="my-4">
        <Label className="text-3xl">Inventory</Label>
      </div>
      <Card className="flex flex-row justify-between px-4 items-center ">
        <SearchItems />
        <div>
          <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <DialogTrigger asChild>
              <Button variant="outline">Add Brand</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Brand Form</DialogTitle>
                <DialogDescription>
                  {editId
                    ? "Edit an existing brand in the inventory"
                    : "Add a new brand to the inventory"}
                </DialogDescription>
              </DialogHeader>
              <div className="w-full flex items-center justify-center">
                <BrandForm id={editId} setId={setEditId} setOpen={setIsOpen} />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </Card>
      <div>
        <BrandTable
          brands={data as Brand[]}
          setOpen={setIsOpen}
          setId={setEditId}
        />
      </div>
    </section>
  );
};

export default Page;
