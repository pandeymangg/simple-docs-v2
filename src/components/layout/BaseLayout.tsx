import React from "react";
import Navbar from "../navigation/Navbar";
import { inter } from "@/lib/fonts";
import clsx from "clsx";

interface IBaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout: React.FC<IBaseLayoutProps> = ({ children }) => {
  return (
    <main
      className={clsx(
        "flex min-h-screen flex-col items-center",
        inter.className
      )}
    >
      <Navbar />
      <div className="container mt-16 flex w-full flex-col items-center">
        {children}
      </div>
    </main>
  );
};

export default BaseLayout;
