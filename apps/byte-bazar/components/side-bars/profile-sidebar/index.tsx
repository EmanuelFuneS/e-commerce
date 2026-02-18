"use client";

import { CreditCard, Table, User } from "lucide-react";
import Link from "next/link";
import { Label, Separator } from "../../../../../packages/ui/src/components";

interface ProfileSidebarProps {
  children: React.ReactNode;
  subHeader: React.ReactNode;
}

const links = [
  {
    name: "Profile",
    icon: User,
    subgroup: [
      {
        name: "Account Details",
        href: "/settings/account",
        icon: User,
      },
      {
        name: "My Orders",
        href: "/settings/orders",
        icon: Table,
      },
      {
        name: "Billing & Payments",
        href: "/settings/billing",
        icon: CreditCard,
      },
    ],
  },
];

const ProfileSidebar = ({ children, subHeader }: ProfileSidebarProps) => {
  return (
    <main className="w-full max-w-6xl mx-auto md:px-4 flex gap-4 m-2">
      <section className="w-1/4 bg-sidebar rounded-md space-y-4 py-8 px-4">
        {links.map((link, index: number) => (
          <div key={index} className="flex flex-col space-x-2">
            <div className="flex">
              <link.icon size={20} />
              <Label>{link.name}</Label>
            </div>
            <Separator className="my-4" />
            <div className="p-2 space-y-2">
              {link.subgroup.map((link, idx: number) => (
                <div key={idx} className="flex space-x-2">
                  <link.icon size={20} />
                  <Link href={link.href}>{link.name}</Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
      <section className="w-3/4">
        <div className="mb-4">{subHeader}</div>
        <div className="px-4">{children}</div>
      </section>
    </main>
  );
};

export default ProfileSidebar;
