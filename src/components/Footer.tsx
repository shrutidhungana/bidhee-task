"use client";

import React, { ReactNode } from "react";

interface FooterProps {
  children?: ReactNode;
}

const Footer: React.FC<FooterProps> = ({ children }) => {
  return (
    <footer className="bg-gradient-to-r from-pink-700 via-purple-700 to-indigo-800 text-white w-full md:sticky md:bottom-0 mt-6 md:mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 lg:px-8">
        {children}
      </div>
    </footer>
  );
};

export default Footer;
