import React from "react";
import { sourceSansPro } from "@/lib/fonts";
import ThemeToggle from "@/ui/ThemeToggle";

const Navbar = () => {
  return (
    <div className="navbar__wrapper fixed top-0 flex h-16 w-full justify-center px-4">
      <nav className="navbar__container container flex items-center justify-between">
        <div className="navbar__logo">
          <h1
            className={`${sourceSansPro.className} text-4xl font-bold text-text`}
          >
            Simple Docs
          </h1>
        </div>

        <ThemeToggle />
      </nav>
    </div>
  );
};

export default Navbar;
