import ProductCard from "@/components/items-cards/product-card";
import { Product } from "@/lib/types/products";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@workspace/ui/components";

interface PaginationGrid {
  data: Product[] | undefined;
  page: number;
  setPage?: (pageNumber: number) => void;
  totalPages?: number;
}

const PaginationGrid = ({
  data,
  page,
  setPage,
  totalPages,
}: PaginationGrid) => {
  const pages = new Array(totalPages).fill("");
  return (
    <div>
      <div className="px-4 grid grid-rows-auto grid-cols-2 md:grid-cols-4 lg:grid-cols-auto gap-3 w-full">
        {data &&
          data.map((e: Product, i: number) => <ProductCard key={i} data={e} />)}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="hover:scale-105  transform transition-transform duration-300" /* onClick={() => setPage(page - 1)} */
            />
          </PaginationItem>
          <PaginationItem>
            {pages.map((_, idx: number) => (
              <PaginationLink /* onClick={() => setPage(idx)} */>
                {idx + 1}
              </PaginationLink>
            ))}
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className="hover:scale-105  transform transition-transform duration-300" /* onClick={() => setPage(page + 1)} */
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationGrid;
