"use client";

import React from "react";
import Tooltip from "./Tooltip";

interface CardProps {
  title: string;
  subtitle?: string;
  rating?: number; // out of 10
  year?: number;
  onClick?: () => void;
    onButtonClick?: () => void;
    buttonText: string;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  rating,
  year,
  onClick,
    onButtonClick,
  buttonText,
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-gradient-to-tr from-[#FDEBD0] to-[#F9D7E3] shadow-lg rounded-xl p-5 hover:shadow-2xl cursor-pointer transition-transform duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
    >
      <div>
        <h2 className="text-xl font-bold mb-2 text-gray-800">
          <Tooltip text={title}>{title}</Tooltip>
        </h2>
        {subtitle && (
          <h3 className="text-gray-600 text-sm mb-3">
            <Tooltip text={subtitle}>{subtitle}</Tooltip>
          </h3>
        )}
      </div>

      <div className="flex justify-between items-center text-gray-700 text-sm mb-3">
        {year && <span className="font-medium">Year: {year}</span>}
        {rating !== undefined && (
          <span className="font-medium">⭐ {rating}/10</span>
        )}
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent card click when button is clicked
          onButtonClick && onButtonClick();
        }}
        className="mt-2 w-full py-2 bg-gradient-to-r from-pink-400 to-orange-400 text-white font-semibold rounded-lg shadow hover:from-pink-500 hover:to-orange-500 transition-all duration-300"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Card;
