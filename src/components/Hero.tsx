"use client";

import React, { ReactNode } from "react";

interface HeroProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  actions?: ReactNode;
  className?: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  imageUrl,
  actions,
  className,
}) => {
  return (
    <section
      className={`w-full max-w-6xl mx-auto bg-gradient-to-br from-teal-50 via-amber-50 to-amber-100 text-gray-900 py-12 px-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between transform transition-all duration-500 hover:scale-[1.01] ${
        className || ""
      }`}
    >
      <div className="flex-1 mb-6 md:mb-0 animate-fade-in-left">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-[#DA70D6] tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-base md:text-lg text-gray-600 mb-5">{subtitle}</p>
        )}
        {actions && <div className="flex space-x-4">{actions}</div>}
      </div>

      {imageUrl && (
        <div className="flex-1 flex justify-center md:justify-end animate-fade-in-right">
          <img
            src={imageUrl}
            alt={title}
            className="max-w-[200px] md:max-w-[300px] rounded-2xl shadow-2xl object-cover transform transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}
    </section>
  );
};

export default Hero;
