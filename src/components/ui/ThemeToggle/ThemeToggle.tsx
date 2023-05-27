import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import clsx from "clsx";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="border-flamingo flex items-center justify-center gap-4 rounded-lg border px-2 py-1">
      <Sun
        onClick={() => setTheme("rosepineDawn")}
        className={clsx("cursor-pointer")}
        size={24}
      />
      <Moon
        onClick={() => setTheme("rosepine")}
        className="cursor-pointer"
        size={24}
      />
    </div>
  );
};

export default ThemeToggle;
