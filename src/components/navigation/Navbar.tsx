import React from "react";
import { lato } from "@/lib/fonts";
import { useSession } from "next-auth/react";
import Image from "next/image";
import clsx from "clsx";
import { Palette } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

const Navbar: React.FC = () => {
  const { setTheme } = useTheme();
  const { data } = useSession();

  return (
    <nav className="navbar fixed top-0 z-50 flex h-16 w-full items-center justify-center bg-cpBase px-6 shadow-lg">
      <div className="container flex h-full items-center justify-between">
        <div className="flex-1">
          <Link
            href="/"
            className={clsx("btn-ghost btn normal-case", lato.className)}
          >
            <div className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="simple docs logo"
                width={48}
                height={48}
              />
              <p className="text-3xl text-cpText">Simple Docs</p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <div className="dropdown-end dropdown">
            <label tabIndex={0} className="btn-ghost btn-circle btn">
              <Palette size={24} className="cursor-pointer text-cpSubtext0" />
            </label>

            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-compact mt-3 w-52 border bg-cpCrust p-2 shadow"
            >
              <li className="text-cpText focus:bg-cpFlamingo">
                <div onClick={() => setTheme("catppuccin-latte")}>Latte</div>
              </li>
              <li className="text-cpText">
                <div onClick={() => setTheme("catppuccin-frappe")}>Frappe</div>
              </li>
              <li className="text-cpText">
                <div onClick={() => setTheme("catppuccin-macchiato")}>
                  Macchiato
                </div>
              </li>
              <li className="text-cpText">
                <div onClick={() => setTheme("catppuccin-mocha")}>Mocha</div>
              </li>
            </ul>
          </div>

          <div className="dropdown-end dropdown">
            <label tabIndex={0} className="btn-ghost btn-circle btn">
              <Image
                src={data?.user?.image || "/images/user.png"}
                style={{
                  objectFit: "cover",
                }}
                width={32}
                height={32}
                alt="avatar"
                className="overflow-hidden rounded-full"
              />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-compact mt-3 w-52 border bg-cpCrust p-2 shadow"
            >
              <li className="text-cpText focus:bg-cpFlamingo">
                <div onClick={() => setTheme("catppuccin-latte")}>Latte</div>
              </li>
              <li className="text-cpText">
                <div onClick={() => setTheme("catppuccin-frappe")}>Frappe</div>
              </li>
              <li className="text-cpText">
                <div onClick={() => setTheme("catppuccin-macchiato")}>
                  Macchiato
                </div>
              </li>
              <li className="text-cpText">
                <div onClick={() => setTheme("catppuccin-mocha")}>Mocha</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
