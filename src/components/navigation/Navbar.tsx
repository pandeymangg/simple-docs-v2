import React from "react";
import { sourceSansPro } from "@/lib/fonts";
import { useSession } from "next-auth/react";
import Image from "next/image";
import clsx from "clsx";
import { Palette } from "lucide-react";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { setTheme } = useTheme();
  const { data } = useSession();

  return (
    <div className="navbar">
      <div className="flex-1">
        <a
          className={clsx(
            "btn-ghost btn text-xl normal-case",
            sourceSansPro.className
          )}
        >
          Simple Docs
        </a>
      </div>
      <div className="flex-none">
        <div className="dropdown-end dropdown">
          <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
            <Palette size={24} />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <div onClick={() => setTheme("rosepine")}>Rose Pine</div>
            </li>
            <li>
              <div onClick={() => setTheme("rosepineMoon")}>Rose Pine Moon</div>
            </li>
            <li>
              <div onClick={() => setTheme("rosepineDawn")}>Rose Pine Dawn</div>
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
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
