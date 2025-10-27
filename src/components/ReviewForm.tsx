"use client";

import React from "react";
import StarRatingSelector from "./StarRatingSelector";

interface ReviewFormProps {
  userName?: string;
  reviewText?: string;
  rating?: number;
  onUserNameChange?: (value: string) => void;
  onReviewTextChange?: (value: string) => void;
  onRatingChange?: (value: number) => void;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  userName = "",
  reviewText = "",
  rating = 0,
  onUserNameChange,
  onReviewTextChange,
  onRatingChange,
  onSubmit,
}) => {
  return (
    <form className="flex flex-col gap-4 bg-transparent" onSubmit={onSubmit}>
      {/* Name */}
      <input
        type="text"
        placeholder="Your Name"
        value={userName}
        onChange={(e) => onUserNameChange?.(e.target.value)}
        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Review Text */}
      <textarea
        placeholder="Write your review..."
        value={reviewText}
        onChange={(e) => onReviewTextChange?.(e.target.value)}
        rows={4}
        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Star Rating */}
      <div>
        <span className="block mb-1 text-gray-700">Rating:</span>
        <StarRatingSelector
          rating={rating}
          onChange={onRatingChange || (() => {})}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="self-start bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
