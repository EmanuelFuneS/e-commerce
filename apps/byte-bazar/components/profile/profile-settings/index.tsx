import Link from "next/link";
import { Button, Label } from "../../../../../packages/ui/src/components";
import { User } from "../../../lib/types";
import ProfilePicture from "../profile-picture";

interface ProfileSettingsProps {
  data?: User;
}

const ProfileSettings = ({ data }: ProfileSettingsProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Label>Profile</Label>
      <div className="bg-card flex items-center min-h-40 rounded-md p-4">
        <ProfilePicture size={40} src={"https://github.com/shadcn.png"} />
        <div className="m-4 space-y-4">
          <Label>{data?.name || "John alfred Doe"}</Label>
          <Label>{data?.email || "jhonDoe@gmail.com"} </Label>
        </div>
      </div>
      <div className="bg-card min-h-40 rounded-md p-4 flex flex-wrap gap-10">
        <Label>
          Address 1: {data?.address || "123 Main St, City, Country"}
        </Label>

        <Label>Phone Number: {data?.phone || "+1234567890"}</Label>
        <Label>City: {data?.city || "Default City"}</Label>
        <Label>Postal Code: {data?.postalCode || "Default Postal Code"}</Label>
      </div>
      <div className="bg-card rounded-md p-4 space-y-4">
        <Label>Security </Label>
        <Button variant="destructive">
          <Link href="/auth/change-password">Change Password</Link>
        </Button>
      </div>
    </div>
  );
};

export default ProfileSettings;
