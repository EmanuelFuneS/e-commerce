import { Moon, SunDim } from "@workspace/ui/lib";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const changeTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else setTheme("dark");
  };

  return (
    <div onClick={changeTheme} className="">
      {theme === "dark" ? <Moon size={30} /> : <SunDim size={30} />}
    </div>
  );
};

export default ThemeToggle;
