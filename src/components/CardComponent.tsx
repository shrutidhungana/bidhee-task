"use client";

import React, { MouseEvent } from "react";
import Image from "next/image";
import Tooltip from "./Tooltip";

interface CardProps {
  title: string;
  subtitle?: string;
  rating?: number;
  year?: number;
  imageUrl?: string; // Add poster URL
  onClick?: () => void;
  onButtonClick?: () => void;
  buttonText: string;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  rating,
  year,
  imageUrl,
  onClick,
  onButtonClick,
  buttonText,
}) => {
  const handleRipple = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${
      e.clientX - button.getBoundingClientRect().left - radius
    }px`;
    circle.style.top = `${
      e.clientY - button.getBoundingClientRect().top - radius
    }px`;
    circle.className =
      "ripple absolute rounded-full bg-white opacity-30 animate-ripple";
    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) ripple.remove();
    button.appendChild(circle);

    onButtonClick && onButtonClick();
  };

  return (
    <div
      onClick={onClick}
      className="bg-gradient-to-tr from-[#FDEBD0] to-[#F9D7E3] shadow-lg rounded-xl hover:shadow-2xl cursor-pointer transition-transform duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
    >
      {imageUrl && (
        <div className="w-full h-60 relative rounded-t-xl overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}

      <div className="p-5 flex flex-col justify-between flex-1">
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
          onClick={handleRipple}
          className="relative overflow-hidden mt-2 w-full py-2 bg-gradient-to-r from-pink-400 to-orange-400 text-white font-semibold rounded-lg shadow hover:from-pink-500 hover:to-orange-500 transition-all duration-300"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Card;
