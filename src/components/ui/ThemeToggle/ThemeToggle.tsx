import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import clsx from "clsx";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-4 rounded-lg border border-flamingo bg-mantle px-2 py-1">
      <Sun
        onClick={() => setTheme("light")}
        className={clsx("cursor-pointer")}
        color={theme === "light" ? "var(--yellow)" : "var(--surface2)"}
        size={24}
      />
      <Moon
        onClick={() => setTheme("dark")}
        className="cursor-pointer"
        color={theme === "dark" ? "var(--sapphire)" : "var(--surface2)"}
        size={24}
      />
    </div>
  );
};

export default ThemeToggle;
