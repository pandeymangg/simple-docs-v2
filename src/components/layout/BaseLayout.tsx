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
      className={clsx("flex min-h-screen flex-col bg-base", inter.className)}
    >
      <Navbar />
      <div className="mt-16">{children}</div>
    </main>
  );
};

export default BaseLayout;
