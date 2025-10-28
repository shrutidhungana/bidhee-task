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
        <FaStar key={`full-${i}`} className="text-yellow-500 w-5 h-5" />
      );
    }

    if (halfStar) {
      stars.push(
        <FaStarHalfAlt key="half" className="text-yellow-500 w-5 h-5" />
      );
    }

    for (let i = stars.length; i < 5; i++) {
      stars.push(
        <FaRegStar key={`empty-${i}`} className="text-gray-300 w-5 h-5" />
      );
    }

    return <div className="flex items-center">{stars}</div>;
  };

  return (
    <div className="space-y-6">
     
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Reviews</h2>
          <p className="text-gray-600">
            {reviewCount} reviews • Average Rating: {averageRating.toFixed(1)} /
            5
          </p>
        </div>
        <div>{renderStars(averageRating)}</div>
      </div>

      {/* Scrollable Review Section */}
      <div className="max-h-64 overflow-y-auto pt-2 space-y-4 pr-2 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center">No reviews yet.</p>
        ) : (
          reviews.map((r) => (
            <div key={r.id} className="space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-800">{r.userName}</h4>
                <div className="flex items-center gap-1 text-sm text-yellow-600">
                  {renderStars(r.rating)}
                  <span className="ml-1 text-gray-600">
                    {r.rating.toFixed(1)}
                  </span>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
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
