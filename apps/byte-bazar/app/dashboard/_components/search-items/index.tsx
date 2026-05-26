import { Search } from "lucide-react";
import { Button, Input } from "../../../../../../packages/ui/src/components";

const SearchItems = () => {
  return (
    <div className="flex w-full max-w-sm items-center gap-1">
      <Input type="text" placeholder="Search" />
      <Button type="submit" variant="outline">
        <Search />
      </Button>
    </div>
  );
};

export default SearchItems;
