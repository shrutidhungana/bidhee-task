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
  // Props for ReviewForm
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
    <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl p-6 md:p-10 flex flex-col gap-8 transform transition-all duration-500 hover:scale-[1.01]">
     
      <div className="flex flex-col md:flex-row gap-8">
       
        {imageUrl && (
          <div className="flex-shrink-0 w-full md:w-1/3">
            <img
              src={imageUrl}
              alt={title}
              className="rounded-2xl w-full h-auto object-cover shadow-lg"
            />
            <div className="mt-4 text-center">
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              <p className="text-gray-600">{subtitle}</p>
            </div>
          </div>
        )}

        
        <div className="flex-1 flex flex-col gap-4 text-gray-700">
         
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold">Director</h3>
              <p className="text-gray-900">{director}</p>
            </div>
            <div>
              <h3 className="font-semibold">Runtime</h3>
              <p className="text-gray-900">{runtime} min</p>
            </div>
            <div>
              <h3 className="font-semibold">Cast</h3>
              <p className="text-gray-900">{cast.join(", ")}</p>
            </div>
          </div>

          
          <div className="mt-4">
            <h3 className="font-semibold text-lg text-gray-700">Synopsis</h3>
            <p className="text-gray-800">{synopsis}</p>
          </div>
        </div>
      </div>

     
      <ReviewList
        reviewCount={reviewCount}
        averageRating={averageRating}
        reviews={reviews}
      />

      
      {reviewFormProps && <ReviewForm {...reviewFormProps} />}
    </div>
  );
};

export default DetailCard;
