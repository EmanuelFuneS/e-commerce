"use client";
import Link from "next/link";
import { Button, Label } from "../../../../../packages/ui/src/components";
import { User } from "../../../lib/types";
import ProfilePicture from "../profile-picture";

interface ProfileSettingsProps {
  data?: User;
}

const ProfileSettings = ({ data }: ProfileSettingsProps) => {
  console.log("data", data);

  const shippingData = data?.shippingAddress[0] || {
    addressLine1: "123 Main St, City, Country",
    phoneNumber: "+1234567890",
    city: "Default City",
    postalCode: "Default Postal Code",
  };

  return (
    <div className="flex flex-col gap-4">
      <Label className="text-3xl">Profile</Label>
      <div className="bg-card flex items-center justify-between min-h-40 rounded-md p-4">
        <div className="flex items-center ">
          <ProfilePicture
            size={40}
            src={data?.photo || "https://github.com/shadcn.png"}
          />
          <div className="m-4 space-y-4">
            <Label>{data?.name || "John alfred Doe"}</Label>
            <Label>{data?.email || "jhonDoe@gmail.com"} </Label>
          </div>
        </div>
        <Button>
          <Link href="/settings/account/edit">Edit Profile</Link>
        </Button>
      </div>
      <Label className="text-2xl">Shipping Address</Label>
      <div className="bg-card min-h-40 rounded-md p-4 flex flex-wrap gap-10">
        <Label>Address 1: {shippingData.addressLine1 || "Not Defined"}</Label>
        <Label>Phone Number: {shippingData.phoneNumber || "Not Defined"}</Label>
        <Label>City: {shippingData.city || "Not Defined"}</Label>
        <Label>Postal Code: {shippingData.postalCode || "Not Defined"}</Label>
      </div>
      <Label className="text-xl">Security </Label>
      <div className="bg-card rounded-md p-4 space-y-4">
        <Button variant="destructive" className="ml-auto">
          <Link href="/auth/change-password">Change Password</Link>
        </Button>
      </div>
    </div>
  );
};

export default ProfileSettings;
