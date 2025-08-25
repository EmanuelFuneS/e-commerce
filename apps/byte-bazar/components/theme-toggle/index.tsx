"use client";
import { Moon, SunDim } from "@workspace/ui/lib";
import { useTheme } from "next-themes";

interface ThemeToggleProps {
  size?: number;
}

const ThemeToggle = ({ size }: ThemeToggleProps) => {
  const { theme, setTheme } = useTheme();

  const changeTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else setTheme("dark");
  };

  return (
    <div onClick={changeTheme} className="">
      {theme === "dark" ? (
        <Moon
          size={size || 37}
          className="hover:scale-115 transform transition-transform duration-300"
        />
      ) : (
        <SunDim
          size={size || 37}
          className="hover:scale-115 transform transition-transform duration-300"
        />
      )}
    </div>
  );
};

export default ThemeToggle;
