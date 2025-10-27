"use client";
"use client";

import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

interface StarRatingSelectorProps {
  rating: number;
  onChange: (value: number) => void;
  size?: number; // optional star size
}

const StarRatingSelector: React.FC<StarRatingSelectorProps> = ({
  rating,
  onChange,
  size = 24,
}) => {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= (hover ?? rating);
        return (
          <FaStar
            key={star}
            className={`cursor-pointer transition-transform duration-150 ${
              isActive ? "text-yellow-500 scale-110" : "text-gray-300"
            }`}
            size={size}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(null)}
          />
        );
      })}
    </div>
  );
};

export default StarRatingSelector;

