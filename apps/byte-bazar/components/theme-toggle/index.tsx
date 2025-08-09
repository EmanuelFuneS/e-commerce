import { Moon, SunDim } from "@workspace/ui/lib";
import { useTheme } from "next-themes";
import { NavigationMenuLink } from "../../../../packages/ui/src/components";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const changeTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else setTheme("dark");
  };

  return (
    <NavigationMenuLink asChild onClick={changeTheme} className="">
      {theme === "dark" ? <Moon size={37} /> : <SunDim size={37} />}
    </NavigationMenuLink>
  );
};

export default ThemeToggle;
