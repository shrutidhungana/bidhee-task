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
    <form
      className="flex flex-col gap-5 bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg"
      onSubmit={onSubmit}
    >
      <input
        type="text"
        placeholder="Your Name"
        value={userName}
        onChange={(e) => onUserNameChange?.(e.target.value)}
        className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/90 placeholder-gray-400 transition"
      />

      <textarea
        placeholder="Write your review..."
        value={reviewText}
        onChange={(e) => onReviewTextChange?.(e.target.value)}
        rows={5}
        className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/90 placeholder-gray-400 transition resize-none"
      />

      <div>
        <span className="block mb-2 text-gray-700 font-medium">Rating:</span>
        <StarRatingSelector
          rating={rating}
          onChange={onRatingChange || (() => {})}
        />
      </div>

      <button
        type="submit"
        className="self-start bg-gradient-to-r from-pink-400 to-orange-400 text-white font-semibold px-6 py-3 rounded-xl hover:scale-105 hover:shadow-xl transition transform"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
