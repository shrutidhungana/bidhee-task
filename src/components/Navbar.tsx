"use client";

import React, { useState, ReactNode } from "react";
import { FiMenu, FiX } from "react-icons/fi";

interface NavbarProps {
  title: string;
  children?: ReactNode; 
}

const Navbar: React.FC<NavbarProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-gradient-to-r from-pink-700 via-purple-700 to-indigo-800 text-white shadow-md fixed w-full z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
        
          <div className="flex-shrink-0 text-2xl font-bold">{title}</div>

          
          <div className="hidden md:flex items-center space-x-4">
            {children}
          </div>

          
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu}>
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

       
        {isOpen && (
          <div className="md:hidden mt-2 space-y-2 px-2 pb-4">{children}</div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
