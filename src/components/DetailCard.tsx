"use client";

import React from "react";
import ReviewList from "@/components/ReviewList";
import ReviewForm from "@/components/ReviewForm";

interface Review {
  id: number;
  userName: string;
  rating: number;
  reviewText: string;
  createdAt: string;
}

interface DetailCardProps {
  title: string;
  subtitle: string;
  imageUrl?: string;
  director: string;
  cast: string[];
  runtime: number;
  synopsis: string;
  reviews?: Review[];
  reviewCount?: number;
  averageRating?: number;
  reviewFormProps?: {
    userName?: string;
    reviewText?: string;
    rating?: number;
    onUserNameChange?: (value: string) => void;
    onReviewTextChange?: (value: string) => void;
    onRatingChange?: (value: number) => void;
    onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  };
}

const DetailCard: React.FC<DetailCardProps> = ({
  title,
  subtitle,
  imageUrl,
  director,
  cast,
  runtime,
  synopsis,
  reviews = [],
  reviewCount = 0,
  averageRating = 0,
  reviewFormProps,
}) => {
  return (
    <div className="max-w-5xl mx-auto bg-gradient-to-tr from-[#FDEBD0] to-[#F9D7E3] shadow-2xl rounded-3xl p-10 md:p-12 flex flex-col gap-10 transform transition-all duration-500 hover:scale-[1.02]">
      <div className="flex flex-col md:flex-row gap-10">
        {imageUrl && (
          <div className="flex-shrink-0 w-full md:w-1/3">
            <img
              src={imageUrl}
              alt={title}
              className="rounded-3xl w-full h-auto object-cover shadow-xl border border-white"
            />
            <div className="mt-5 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#1e3a8a] tracking-wide border-b-2 border-[#1e3a8a] inline-block pb-1">
                {title}
              </h2>
              <p className="text-gray-400 text-lg mt-1">{subtitle}</p>
            </div>
          </div>
        )}

        <div className="flex-1 flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="p-4 bg-white/80 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="font-semibold text-[#1e3a8a] uppercase tracking-wide border-b-2 border-[#1e3a8a] inline-block pb-1">
                Director
              </h3>
              <p className="text-gray-400 mt-1">{director}</p>
            </div>
            <div className="p-4 bg-white/80 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="font-semibold text-[#1e3a8a] uppercase tracking-wide border-b-2 border-[#1e3a8a] inline-block pb-1">
                Runtime
              </h3>
              <p className="text-gray-400 mt-1">{runtime} min</p>
            </div>
            <div className="p-4 bg-white/80 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="font-semibold text-[#1e3a8a] uppercase tracking-wide border-b-2 border-[#1e3a8a] inline-block pb-1">
                Cast
              </h3>
              <p className="text-gray-400 mt-1">{cast.join(", ")}</p>
            </div>
          </div>

          <div className="mt-6 border-t border-[#1e3a8a]/50 pt-4">
            <h3 className="font-semibold text-xl text-[#1e3a8a] mb-2 border-b-2 border-[#1e3a8a] inline-block pb-1">
              Synopsis
            </h3>
            <p className="text-gray-400 leading-relaxed">{synopsis}</p>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-[#1e3a8a]/50 pt-6">
        <h3 className="text-2xl font-bold text-[#1e3a8a] mb-4 border-b-2 border-[#1e3a8a] pb-1">
          Review List
        </h3>
        <ReviewList
          reviewCount={reviewCount}
          averageRating={averageRating}
          reviews={reviews}
        />
      </div>

      {reviewFormProps && (
        <div className="mt-10 border-t border-[#1e3a8a]/50 pt-6">
          <h3 className="text-2xl font-bold text-[#1e3a8a] mb-4 border-b-2 border-[#1e3a8a] pb-1">
            Write a Review
          </h3>
          <ReviewForm {...reviewFormProps} />
        </div>
      )}
    </div>
  );
};

export default DetailCard;
