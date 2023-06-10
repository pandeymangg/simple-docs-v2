import React from "react";
import { readexPro } from "@/lib/fonts";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import clsx from "clsx";
import { Palette, FileText, User } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Conditional } from "@pandeymangg/react-conditional";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const { setTheme } = useTheme();
  const { data, status } = useSession();

  const router = useRouter();

  const isAuthenticated = status === "authenticated";

  return (
    <nav className="navbar fixed top-0 z-50 flex h-16 w-full items-center justify-center bg-cpBase px-6 shadow-lg">
      <div className="container flex h-full items-center justify-between">
        <div className="flex-1">
          <Link
            href="/"
            className={clsx("btn-ghost btn normal-case", readexPro.className)}
          >
            <div className="flex items-center gap-2">
              <FileText size={48} className="text-cpFlamingo" />
              <p className="text-3xl text-cpText">Simple Docs</p>
            </div>
          </Link>
        </div>

        <button className="btn" onClick={() => void signOut()}>
          Sign out
        </button>

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
              <Conditional
                condition={isAuthenticated}
                fallback={
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cpSurface2">
                    <User
                      size={24}
                      className="cursor-pointer text-cpSubtext0"
                    />
                  </div>
                }
              >
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
              </Conditional>
            </label>

            <Conditional condition={!isAuthenticated}>
              <div
                tabIndex={0}
                className="dropdown-content menu menu-compact mt-4 min-w-[240px] rounded-lg border border-cpSurface0 bg-cpCrust p-4 shadow"
              >
                <div className="flex w-full flex-col items-center justify-center gap-4">
                  <div>
                    <FileText size={64} className="text-cpFlamingo" />
                  </div>
                  <h1 className="text-center text-2xl font-semibold leading-tight text-cpText">
                    Sign up or log in to Simple Docs
                  </h1>

                  <p className="text-center font-medium text-cpSubtext0">
                    Takes less than a few seconds.
                  </p>

                  <div className="flex w-full items-center justify-between gap-4">
                    <button
                      onClick={() => router.push("/register")}
                      className="btn-primary btn flex-1 rounded-full capitalize"
                    >
                      Sign up
                    </button>
                    <button className="btn-secondary btn flex-1 rounded-full border border-cpFlamingo capitalize text-cpFlamingo">
                      Log in
                    </button>
                  </div>
                </div>
              </div>
            </Conditional>
            {/* <ul
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
            </ul> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
