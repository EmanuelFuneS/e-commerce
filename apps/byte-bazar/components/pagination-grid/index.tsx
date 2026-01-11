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
  changePage: (pageNumber: number) => void;
  totalPages?: number;
}

const PaginationGrid = ({
  data,
  page,
  changePage,
  totalPages,
}: PaginationGrid) => {
  console.log("pages", totalPages, page);

  const pages = new Array(totalPages).fill("");
  return (
    <div>
      <div className="px-4 grid grid-rows-3 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
        {data &&
          data.map((e: Product, i: number) => <ProductCard key={i} data={e} />)}
      </div>
      <Pagination className="py-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="hover:scale-105  transform transition-transform duration-300"
              onClick={() => (page > 0 ? changePage(page - 1) : null)}
            />
          </PaginationItem>
          <PaginationItem>
            {pages.map((_, idx: number) => (
              <PaginationLink
                key={idx}
                isActive={idx === page}
                onClick={() => changePage(idx)}
              >
                {idx + 1}
              </PaginationLink>
            ))}
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className="hover:scale-105  transform transition-transform duration-300"
              onClick={() =>
                page < totalPages! - 1 ? changePage(page + 1) : null
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationGrid;
