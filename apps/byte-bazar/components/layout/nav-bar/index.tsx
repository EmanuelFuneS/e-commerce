"use client";
import { useState } from "react";
import { Category } from "@prisma/client";
//import { useUser } from "@auth0/nextjs-auth0";
import { Badge, Button, Input, ScrollArea, Separator, Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, Skeleton } from "@workspace/ui/components";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@workspace/ui/components/navigation-menu";
import {
  Cart,
  Cog,
  Heart,
  InboxArchive,
  Menu,
  Search,
  User,
} from "@workspace/ui/lib";
import NextImage from "next/image";
import Link from "next/link";
import useCategories from "../../../lib/hooks/useCategories";
import useFavoritesProducts from "../../../lib/hooks/useFavoritesProducts";
import { useStoreCart } from "../../../lib/store";
import { Product } from "../../../lib/types";
import { ProductHelper } from "../../../lib/utils";
import ListProductCard from "../../items-cards/list-product-card";
import ProfileAuth from "../../profile/profile-auth";
import ProfileLogout from "../../profile/profile-logout";
import ProfilePicture from "../../profile/profile-picture";
import ThemeToggle from "../../theme-toggle";
import { CommandSearchWithGroups } from "../../search-bar/command-search";

const NavBar = ({ isAuth }: { isAuth: boolean }) => {
  const { data: categories, isLoading } = useCategories();
  const { favorites } = useFavoritesProducts();
  const { cart } = useStoreCart();

  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="hidden md:block w-full mx-auto max-w-fit py-4 ">
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>

              <NavigationMenuContent className="relative z-50">
                <ul className="grid w-100 gap-2 md:w-125 md:grid-cols-2 lg:w-150">
                  {!isLoading && categories?.length ? (
                    categories.map((cat: Category, index: number) => (
                      <ListItem
                        key={index}
                        title={cat.name}
                        href={`/products/${ProductHelper.generateSlug(cat.name || "")}`}
                        imageAlt={cat.name || ""}
                        imageUrl={cat.imageUrl || ""}
                      ></ListItem>
                    ))
                  ) : (
                    <Skeleton />
                  )}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/build-pc">Build PC</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/promotions">
                Promotions
              </NavigationMenuLink>
            </NavigationMenuItem>
            {/* <NavigationMenuItem>
              <NavigationMenuLink href="/">Home</NavigationMenuLink>
            </NavigationMenuItem> */}
            <NavigationMenuItem>
              <NavigationMenuLink className="cursor-pointer">
                <div
                  className="flex w-full max-w-sm items-center gap-1"
                  onClick={() => setOpen(true)}
                >
                  <Input type="text" placeholder="Search" />
                  <Button type="submit" variant="outline">
                    <Search />
                  </Button>
                </div>

                <CommandSearchWithGroups open={open} setOpen={setOpen} />
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuList className="lg:pl-20">
            <NavigationMenuItem>
              <NavigationMenuLink>
                <ThemeToggle />
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Heart size={20} />
              </NavigationMenuTrigger>
              <NavigationMenuContent className="relative z-50">
                <ul className="grid w-50">
                  <li>
                    <ScrollArea className="h-70">
                      {favorites?.map((el: Product, idx: number) => (
                        <NavigationMenuLink key={idx} asChild>
                          <ListProductCard item={el} />
                        </NavigationMenuLink>
                      ))}
                    </ScrollArea>
                    <NavigationMenuLink asChild>
                      <Link
                        href={"/wishlist"}
                        className="border-2 shadow-lg bg-background dark:bg-card text-center hover:scale-105  transform transition-transform duration-300"
                      >
                        View All
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Cart size={20} />
              </NavigationMenuTrigger>
              <NavigationMenuContent className="relative z-50">
                <ul className="grid w-50">
                  <li>
                    <ScrollArea className="h-[280]">
                      {cart.length > 0 &&
                        cart.map((el: Product, idx: number) => (
                          <NavigationMenuLink key={idx} asChild>
                            <ListProductCard item={el} />
                          </NavigationMenuLink>
                        ))}
                    </ScrollArea>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/cart"
                        className="border-2 shadow-lg bg-background dark:bg-card text-center hover:scale-105  transform transition-transform duration-300"
                      >
                        View Cart
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              {isAuth ? (
                <NavigationMenuTrigger>
                  <ProfilePicture />
                </NavigationMenuTrigger>
              ) : (
                <ProfileAuth />
              )}
              {isAuth && (
                <NavigationMenuContent className="relative z-50">
                  <ul className="grid w-50 gap-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/settings/account"
                          className="flex-row items-center gap-2"
                        >
                          <User />
                          Manage My Account
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/settings/orders"
                          className="flex-row items-center gap-2"
                        >
                          <InboxArchive />
                          My Orders
                        </Link>
                      </NavigationMenuLink>

                      <NavigationMenuLink asChild>
                        <Link
                          href="/settings"
                          className="flex-row items-center gap-2"
                        >
                          <Cog />
                          Settings
                        </Link>
                      </NavigationMenuLink>

                      <NavigationMenuLink
                        asChild
                        className={navigationMenuTriggerStyle()}
                      >
                        <ProfileLogout />
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              )}
            </NavigationMenuItem>

            {/* {!user && (
              <NavigationMenuItem>
                <ProfileAuth />
              </NavigationMenuItem>
            )} */}
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
      <nav className="block md:hidden">
        <div className="flex items-center justify-between px-4 h-14 border-b">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-70 sm:w-[320px] p-0 flex flex-col">
              <SheetHeader className="p-4 border-b">
                <SheetTitle className="text-left">Byte Bazar</SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-auto p-4 space-y-1">
                <SheetTrigger asChild>
                  <Link href="/products" className="flex items-center py-2 text-sm font-medium hover:text-primary transition-colors">
                    Products
                  </Link>
                </SheetTrigger>
                <SheetTrigger asChild>
                  <Link href="/build-pc" className="flex items-center py-2 text-sm font-medium hover:text-primary transition-colors">
                    Build PC
                  </Link>
                </SheetTrigger>
                <SheetTrigger asChild>
                  <Link href="/promotions" className="flex items-center py-2 text-sm font-medium hover:text-primary transition-colors">
                    Promotions
                  </Link>
                </SheetTrigger>
                <Separator className="my-3" />
                {isAuth ? (
                  <>
                    <SheetTrigger asChild>
                      <Link href="/settings/account" className="flex items-center gap-2 py-2 text-sm hover:text-primary transition-colors">
                        <User size={16} />
                        Manage My Account
                      </Link>
                    </SheetTrigger>
                    <SheetTrigger asChild>
                      <Link href="/settings/orders" className="flex items-center gap-2 py-2 text-sm hover:text-primary transition-colors">
                        <InboxArchive size={16} />
                        My Orders
                      </Link>
                    </SheetTrigger>
                    <SheetTrigger asChild>
                      <Link href="/settings" className="flex items-center gap-2 py-2 text-sm hover:text-primary transition-colors">
                        <Cog size={16} />
                        Settings
                      </Link>
                    </SheetTrigger>
                    <Separator className="my-3" />
                    <div className="pt-2">
                      <ProfileLogout />
                    </div>
                  </>
                ) : (
                  <div className="pt-2">
                    <Button variant="default" asChild className="w-full">
                      <Link href="/auth/login">Login</Link>
                    </Button>
                  </div>
                )}
              </div>
              <div className="p-4 border-t">
                <ThemeToggle />
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="font-bold text-lg">
            Byte Bazar
          </Link>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => setOpen(true)} aria-label="Search">
              <Search size={20} />
            </Button>
            <Link href="/wishlist" className="relative">
              <Button variant="ghost" size="icon" aria-label="Wishlist">
                <Heart size={20} />
                {favorites?.length > 0 && (
                  <Badge variant="destructive" className="absolute -top-1.5 -right-1.5 h-5 w-5 flex items-center justify-center p-0 text-[10px]">
                    {favorites.length}
                  </Badge>
                )}
              </Button>
            </Link>
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon" aria-label="Cart">
                <Cart size={20} />
                {cart.length > 0 && (
                  <Badge variant="destructive" className="absolute -top-1.5 -right-1.5 h-5 w-5 flex items-center justify-center p-0 text-[10px]">
                    {cart.length}
                  </Badge>
                )}
              </Button>
            </Link>
            {isAuth ? (
              <ProfilePicture size={8} />
            ) : (
              <Button variant="ghost" size="icon" asChild>
                <Link href="/auth/login" aria-label="Login">
                  <User size={20} />
                </Link>
              </Button>
            )}
          </div>
        </div>
        <CommandSearchWithGroups open={open} setOpen={setOpen} />
      </nav>
    </>
  );
};

function ListItem({
  title,
  children,
  href,
  imageUrl,
  imageAlt,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & {
  href: string;
  imageUrl: string;
  imageAlt: string;
}) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild className="hover:bg-background dark:bg-card">
        <Link href={href}>
          {imageUrl ? (
            <NextImage
              src={imageUrl}
              alt={imageAlt}
              width={20}
              height={20}
              className="w-6 h-6 dark:invert dark:brightness-0 dark:contrast-100"
            />
          ) : (
            <Skeleton className="w-5 h-5 bg-slate-500" />
          )}
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export default NavBar;
