"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  useCategoriesStore,
  useProductsStore,
} from "../../lib/store";
import { Product } from "../../lib/types";
import { ProductHelper } from "../../lib/utils";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@workspace/ui/components";
import {
  CreditCardIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";

interface CommandSearchProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function CommandSearchWithGroups({ open, setOpen }: CommandSearchProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { products, initializeProducts } = useProductsStore();
  const { categories } = useCategoriesStore();

  useEffect(() => {
    initializeProducts();
  }, [initializeProducts]);

  const filteredCategories = search
    ? categories.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()),
      )
    : categories;

  const filteredProducts = search
    ? products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      )
    : [];

  const hasResults =
    filteredCategories.length > 0 || filteredProducts.length > 0;

  const handleCategorySelect = (catName: string) => {
    router.push(`/products/${ProductHelper.generateSlug(catName)}`);
    setOpen(false);
  };

  const handleProductSelect = (product: Product) => {
    const categoryName = product.category?.name || "";
    router.push(
      `/products/${encodeURIComponent(categoryName)}/${encodeURIComponent(product.name)}`,
    );
    setOpen(false);
  };

  return (
    <div className={`flex flex-col gap-4 ${open === true ? "" : "hidden"}`}>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Type a command or search..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            {search ? (
              <>
                {!hasResults && <CommandEmpty>No results found.</CommandEmpty>}
                {filteredCategories.length > 0 && (
                  <CommandGroup heading="Categories">
                    {filteredCategories.map((cat) => (
                      <CommandItem
                        key={cat.id}
                        onSelect={() => handleCategorySelect(cat.name)}
                      >
                        <span>{cat.name}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
                {filteredCategories.length > 0 &&
                  filteredProducts.length > 0 && <CommandSeparator />}
                {filteredProducts.length > 0 && (
                  <CommandGroup heading="Products">
                    {filteredProducts.slice(0, 10).map((product) => (
                      <CommandItem
                        key={product.id}
                        onSelect={() => handleProductSelect(product)}
                      >
                        <span>{product.name}</span>
                        <span className="ml-auto text-muted-foreground">
                          $
                          {Number(
                            product.finalPrice || product.price,
                          ).toFixed(2)}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </>
            ) : (
              <CommandGroup heading="Suggestions">
                <div className="h-23" />
              </CommandGroup>
            )}
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>
                <UserIcon />
                <Link href={"/settings/account"}>Profile</Link>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <CreditCardIcon />
                <Link href={"/settings"}>Billing</Link>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <SettingsIcon />
                <Link href={"/settings"}>Settings</Link>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
}
