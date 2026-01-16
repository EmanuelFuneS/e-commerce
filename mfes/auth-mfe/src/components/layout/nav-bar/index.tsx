import { Label } from "@workspace/ui/components";
import { Link } from "react-router";
import ThemeToggle from "../../../../../../packages/ui/src/components/theme-toggle-custom";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <header className="w-full bg-card border-b-2 h-10 flex justify-between px-5 text-gray-800 dark:text-muted-foreground">
      <Label>AuthService</Label>
      <div className="flex items-center space-x-2">
        <Label className="text-xs ">
          Don't have an account ?.
          <Link to="/">Sign Up</Link>
        </Label>
        <ThemeToggle size={20} />
      </div>
    </header>
  );
};

export default Navbar;
