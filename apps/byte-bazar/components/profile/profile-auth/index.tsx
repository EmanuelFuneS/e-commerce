"use client";
import Link from "next/link";
import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "../../../../../packages/ui/src/components";
import { Login } from "../../../../../packages/ui/src/lib";

const ProfileAuth = () => {
  return (
    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
      <Link href="/auth/login" className="flex-row items-center gap-2">
        <Login />
        Login
      </Link>
    </NavigationMenuLink>
  );
};

export default ProfileAuth;
