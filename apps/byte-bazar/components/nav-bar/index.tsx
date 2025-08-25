"use client";

import { useUser } from "@auth0/nextjs-auth0";
import { Button, Input, ScrollArea, Skeleton } from "@workspace/ui/components";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@workspace/ui/components/navigation-menu";
import {
  Cart,
  Cog,
  Heart,
  InboxArchive,
  Menu,
  Search,
  User,
  XCircle,
} from "@workspace/ui/lib";
import NextImage from "next/image";
import Link from "next/link";
import useCategories from "../../lib/hooks/useCategories";
import useFavoritesProducts from "../../lib/hooks/useFavoritesProducts";
import { Product } from "../../lib/types";
import { Category } from "../../lib/types/categories";
import ListProductCard from "../items-cards/list-product-card";
import ProfileAuth from "../profile/profile-auth";
import ProfilePicture from "../profile/profile-picture";
import ThemeToggle from "../theme-toggle";

const NavBar = () => {
  const { user, isLoading } = useUser();
  const { categories } = useCategories();
  const { favorites } = useFavoritesProducts();

  console.log(favorites);
  return (
    <>
      <nav className="hidden md:block w-full mx-auto max-w-fit py-4 ">
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>

              <NavigationMenuContent className="relative z-50">
                <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {categories.map((cat: Category, index: number) => (
                    <ListItem
                      key={cat.id}
                      title={cat.name}
                      href={`/products/${cat.slug}`}
                      imageAlt={cat.name || ""}
                      imageUrl={cat.imageUrl || ""}
                    >
                      {cat.description ? (
                        <Skeleton
                          className={`${index % 2 === 0 ? "w-[100px]" : "w-[120px]"} h-4 bg-slate-500`}
                        />
                      ) : (
                        <p>{cat.description || "Default Descriptions"}</p>
                      )}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/brands">Brands</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/promotions">
                Promotions
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/">Home</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink>
                <div className="flex w-full max-w-sm items-center gap-1">
                  <Input type="text" placeholder="Search" />
                  <Button type="submit" variant="outline">
                    <Search />
                  </Button>
                </div>
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
                <ul className="grid w-[200px]">
                  <li>
                    <ScrollArea className="h-[280px]">
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
                <ul className="grid w-[200px]">
                  <li>
                    <ScrollArea className="h-[280]">
                      {favorites?.map((el: Product, idx: number) => (
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
              <NavigationMenuTrigger>
                <ProfilePicture />
              </NavigationMenuTrigger>
              <NavigationMenuContent className="relative z-50">
                <ul className="grid w-[200px] gap-4">
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
                        href="/settings/order"
                        className="flex-row items-center gap-2"
                      >
                        <InboxArchive />
                        My Orders
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/settings/order/canceled"
                        className="flex-row items-center gap-2"
                      >
                        <XCircle />
                        My Cancellations
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
                    {user && <ProfileAuth />}
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {!user && (
              <NavigationMenuItem>
                <ProfileAuth />
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
      <nav className="block md:hidden m-4 px-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Menu />
              </NavigationMenuTrigger>
              <NavigationMenuContent className="relative z-50">
                <ul className="grid w-[300px] gap-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="#">
                        <div className="font-medium">Products</div>
                        <div className="text-muted-foreground">
                          Browse all components in the library.
                        </div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="#">
                        <div className="font-medium">Promotions</div>
                        <div className="text-muted-foreground">
                          Learn how to use the library.
                        </div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="#">
                        <div className="font-medium">User settings</div>
                        <div className="text-muted-foreground">
                          Read our latest blog posts.
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li className="flex w-full justify-around">
                    <NavigationMenuItem>
                      <ThemeToggle />
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <ProfilePicture />
                    </NavigationMenuItem>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink>
                <div className="flex w-full max-w-sm items-center gap-1">
                  <Input type="text" placeholder="Search" />
                  <Button type="submit" variant="outline">
                    <Search />
                  </Button>
                </div>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
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
