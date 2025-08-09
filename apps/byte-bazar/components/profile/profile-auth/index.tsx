"use client";
import { useUser } from "@auth0/nextjs-auth0";
import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@workspace/ui/components/navigation-menu";
import { Login, Logout } from "@workspace/ui/lib";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";
import { syncUser } from "../../../lib/actions/auth/syncUser";
type Props = {};

const ProfileAuth = (props: Props) => {
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (user?.email && user?.sub && user?.name) {
      const runSync = async () => {
        const result = await syncUser(user.email!, user.sub!);
        if (result.success) {
          toast("Sync success", {
            description: result.message,
          });
        } else {
          toast("Sync failed", {
            description: result.message,
          });
        }
      };
      runSync();
    }
  }, [user]);
  return (
    <>
      {user ? (
        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
          <Link href={"/auth/logout"} className="flex-row items-center gap-2">
            <Logout />
            Logout
          </Link>
        </NavigationMenuLink>
      ) : (
        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
          <Link href="/auth/login" className="flex-row items-center gap-2">
            <Login />
            Login
          </Link>
        </NavigationMenuLink>
      )}
    </>
  );
};

export default ProfileAuth;
