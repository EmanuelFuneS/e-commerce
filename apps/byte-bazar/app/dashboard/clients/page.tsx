import { Label } from "@workspace/ui/components";

const Page = () => {
  return (
    <div className="w-full p-2">
      <div className="my-4">
        <Label className="text-3xl">Client</Label>
      </div>
      {/* <div className="py-4 flex justify-end items-center ">
        <Button>Add New Product</Button>
      </div> */}
      <div>{/* <ProductTable data={products?.data} /> */}</div>
    </div>
  );
};

export default Page;
