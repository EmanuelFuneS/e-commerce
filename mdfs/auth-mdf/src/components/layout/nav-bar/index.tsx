import { Label } from "@workspace/ui/components";
import { Link } from "react-router";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <header className="w-full bg-card border-b-2 h-10 flex justify-between px-5">
      <Label>AuthService</Label>
      <Label className="text-xs ">
        Don't have an account ?.
        <Link to="/register">Sign Up</Link>
      </Label>
    </header>
  );
};

export default Navbar;
