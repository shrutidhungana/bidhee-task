"use client";

import React, { ReactNode } from "react";
import clsx from "clsx";

type SidebarProps = {
  children: ReactNode;
  width?: string;
  title?: string;
  position?: "left" | "right";
};

const Sidebar: React.FC<SidebarProps> = ({
  children,
  title,
  width = "w-64",
  position = "left",
}) => {
  const borderClass =
    position === "left"
      ? "border-r border-gray-300 rounded-tr-2xl rounded-br-2xl"
      : "border-l border-gray-300 rounded-tl-2xl rounded-bl-2xl";

  return (
    <>
      
      <div
        className={clsx(
          "hidden md:flex flex-col flex-shrink-0",
          width,
          "min-h-[calc(100vh-4rem)] p-6 box-border",
          "bg-gradient-to-br from-[#F8FAFC] via-[#EBF2F7] to-[#E2E8F0]",
          borderClass,
          "text-[#1e3a8a] shadow-lg"
        )}
      >
        {title && (
          <h2 className="text-2xl font-bold mb-6 tracking-tight">{title}</h2>
        )}
        <div className="flex-1 flex flex-col gap-4">{children}</div>
      </div>

   
      <div
        className={clsx(
          "flex md:hidden flex-col w-full p-4 mb-4",
          "bg-gradient-to-br from-[#F8FAFC] via-[#EBF2F7] to-[#E2E8F0]",
          "border-b border-gray-300 rounded-b-xl text-[#1e3a8a]"
        )}
      >
        {title && (
          <h2 className="text-xl font-semibold mb-4 tracking-tight">{title}</h2>
        )}
        <div className="flex flex-col gap-3">{children}</div>
      </div>
    </>
  );
};

export default Sidebar;
