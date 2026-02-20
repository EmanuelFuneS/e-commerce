"use client";
import { Button } from "../../../../../packages/ui/src/components";
import { Logout } from "../../../../../packages/ui/src/lib";
import useLogout from "../../../lib/hooks/useLogout";

const ProfileLogout = () => {
  const logout = useLogout();

  const handleLogout = () => {
    logout.mutate();
  };

  return (
    <Button onClick={handleLogout} className="flex-row items-center gap-2">
      <Logout />
      Logout
    </Button>
  );
};

export default ProfileLogout;
