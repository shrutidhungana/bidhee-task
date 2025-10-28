"use client";

import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface Review {
  id: number;
  userName: string;
  rating: number;
  reviewText: string;
  createdAt: string;
}

interface ReviewListProps {
  reviewCount: number;
  averageRating: number;
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({
  reviewCount,
  averageRating,
  reviews,
}) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar key={`full-${i}`} className="text-yellow-400 w-5 h-5" />
      );
    }
    if (halfStar) {
      stars.push(
        <FaStarHalfAlt key="half" className="text-yellow-400 w-5 h-5" />
      );
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(
        <FaRegStar key={`empty-${i}`} className="text-gray-300 w-5 h-5" />
      );
    }
    return <div className="flex items-center gap-1">{stars}</div>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-gray-600 mt-1">
            {reviewCount} reviews • Average Rating: {averageRating.toFixed(1)} /
            5
          </p>
        </div>
        <div>{renderStars(averageRating)}</div>
      </div>

      <div className="max-h-72 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-pink-300 hover:scrollbar-thumb-pink-400">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No reviews yet.</p>
        ) : (
          reviews.map((r) => (
            <div
              key={r.id}
              className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-[#1e3a8a]">{r.userName}</h4>
                <div className="flex items-center gap-1 text-sm">
                  {renderStars(r.rating)}
                  <span className="ml-1 text-gray-600 font-medium">
                    {r.rating.toFixed(1)}
                  </span>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-2">
                {r.reviewText}
              </p>
              <p className="text-gray-400 text-xs">
                {new Date(r.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewList;
