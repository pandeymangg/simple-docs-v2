import React from "react";
import { sourceSansPro } from "@/lib/fonts";
import ThemeToggle from "@/ui/ThemeToggle";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Conditional } from "@pandeymangg/react-conditional";

const Navbar = () => {
  const { data } = useSession();

  return (
    <div className="navbar__wrapper fixed top-0 flex h-16 w-full justify-center px-4">
      <nav className="navbar__container container flex items-center justify-between pt-4">
        <div className="navbar__logo">
          <h1
            className={`${sourceSansPro.className} text-4xl font-bold text-text`}
          >
            Simple Docs
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          <div className="overflow-hidden rounded-full border-2 border-overlay2">
            <Conditional
              condition={!!data?.user}
              fallback={
                <Image
                  src={"/images/user.png"}
                  alt="user avatar"
                  width={32}
                  height={32}
                  className="overflow-hidden rounded-full"
                  style={{
                    objectFit: "cover",
                  }}
                />
              }
            >
              <Image
                src={data?.user?.image ?? ""}
                alt="user avatar"
                width={32}
                height={32}
                className="overflow-hidden rounded-full"
                style={{
                  objectFit: "cover",
                }}
              />
            </Conditional>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
