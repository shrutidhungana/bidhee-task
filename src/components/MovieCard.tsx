"use client";

import React, { ReactNode } from "react";
import Image from "next/image";

interface CardProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  children?: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  imageUrl,
  children,
  className,
}) => {
  return (
    <div
      className={`w-full max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-8 flex flex-col md:flex-row gap-6 transform transition-all duration-500 hover:scale-[1.01] ${
        className || ""
      }`}
    >
      {/* Image Section */}
      {imageUrl && (
        <div className="flex-shrink-0 relative w-full md:w-1/3 h-64 md:h-auto rounded-2xl overflow-hidden shadow-lg animate-fade-in-left">
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        </div>
      )}

      {/* Content Section */}
      <div className="flex-1 flex flex-col gap-4 animate-fade-in-right">
        <h2 className="text-3xl font-extrabold text-gray-800">{title}</h2>
        {subtitle && (
          <p className="text-gray-600 text-base md:text-lg">{subtitle}</p>
        )}

        {/* Children for details */}
        <div className="mt-2 text-gray-700 space-y-2">{children}</div>
      </div>
    </div>
  );
};

export default Card;
