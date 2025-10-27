"use client";

import React, { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useMovie } from "@/hooks/useMovie";
import { useMovieStore } from "@/store/movieStore";
import { useReviews } from "@/hooks/useReviews";
import { useReviewStore } from "@/store/reviewStore";
import DetailCard from "@/components/DetailCard";
import useToast from "@/hooks/useToast";

interface DetailPageClientProps {
  movieId: number;
}

const DetailPageClient: React.FC<DetailPageClientProps> = ({ movieId }) => {
  const router = useRouter();
  const { data: movie, isLoading, isError } = useMovie(movieId);
  const setMovie = useMovieStore((state) => state.setMovie);

  const { data: reviews = [], addReview } = useReviews(movieId);
  const setReviews = useReviewStore((state) => state.setReviews);

  const { success, error } = useToast();

  const [userName, setUserName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (movie) setMovie(movie);
  }, [movie, setMovie]);

  useEffect(() => {
    if (reviews.length) setReviews(reviews);
  }, [reviews, setReviews]);

  const averageRating = useMemo(() => {
    if (!reviews.length) return 0;
    return reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  }, [reviews]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userName || !reviewText || !rating) {
      error("Please fill all fields and select a rating.");
      return;
    }

    try {
      await addReview({ movieId, userName, reviewText, rating });
      setUserName("");
      setReviewText("");
      setRating(0);
      success("Review added successfully!");
    } catch (err: any) {
      console.error("Failed to add review", err);
      error(err?.message || "Something went wrong while adding your review.");
    }
  };

  if (isLoading)
    return (
      <p className="pt-24 px-4 text-gray-500 animate-pulse text-center text-lg">
        Loading...
      </p>
    );

  if (isError || !movie)
    return (
      <p className="pt-24 px-4 text-red-500 text-center text-lg">
        Movie not found.
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#F8FAFC] via-[#EBF2F7] to-[#E2E8F0]">
      <Navbar title="Movie Details">
        <button
          onClick={() => router.push("/")}
          className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition"
        >
          Back to Dashboard
        </button>
      </Navbar>

      <main className="pt-24 px-6 space-y-10">
        <DetailCard
          title={movie.title}
          subtitle={`${movie.genre.join(", ")} | ${movie.year} | ${
            movie.language
          }`}
          imageUrl={movie.posterUrl}
          director={movie.director}
          cast={movie.cast}
          runtime={movie.runtime}
          synopsis={movie.synopsis}
          reviews={reviews}
          reviewCount={reviews.length}
          averageRating={averageRating}
          reviewFormProps={{
            userName,
            reviewText,
            rating,
            onUserNameChange: setUserName,
            onReviewTextChange: setReviewText,
            onRatingChange: setRating,
            onSubmit: handleSubmit,
          }}
        />
      </main>
    </div>
  );
};

export default DetailPageClient;
