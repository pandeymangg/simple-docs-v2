import React from "react";
import Navbar from "../navigation/Navbar";
import { poppins } from "@/lib/fonts";
import clsx from "clsx";

interface IBaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout: React.FC<IBaseLayoutProps> = ({ children }) => {
  return (
    <main
      className={clsx(
        "flex min-h-screen flex-col items-center bg-cpBase",
        poppins.className
      )}
    >
      <Navbar />
      <div className="mt-16 flex w-full flex-col items-center text-cpText">
        {children}
      </div>
    </main>
  );
};

export default BaseLayout;
