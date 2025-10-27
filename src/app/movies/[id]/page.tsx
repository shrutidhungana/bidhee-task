"use client";

import React, { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useMovie } from "@/hooks/useMovie";
import { useMovieStore } from "@/store/movieStore";
import { useReviews, Review } from "@/hooks/useReviews";
import { useReviewStore } from "@/store/reviewStore";
import DetailCard from "@/components/DetailCard";

interface DetailPageProps {
  params: {
    id: string;
  };
}

const DetailPage: React.FC<DetailPageProps> = ({ params }) => {
  const router = useRouter();
  const movieId = Number(params.id);

  // Movie data
  const { data: movie, isLoading, isError } = useMovie(movieId);
  const setMovie = useMovieStore((state) => state.setMovie);

  // Reviews data
  const { data: reviews = [], addReview, isAdding } = useReviews(movieId);
  const setReviews = useReviewStore((state) => state.setReviews);

  // Local state for ReviewForm
  const [userName, setUserName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  // Set movie in store
  useEffect(() => {
    if (movie) setMovie(movie);
  }, [movie, setMovie]);

  // Set reviews in store
  useEffect(() => {
    if (reviews.length) setReviews(reviews);
  }, [reviews, setReviews]);

  // Average rating calculation
  const averageRating = useMemo(() => {
    if (!reviews.length) return 0;
    return reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  }, [reviews]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userName || !reviewText || !rating) return;

    try {
      await addReview({ movieId, userName, reviewText, rating });
      // Clear form after submission
      setUserName("");
      setReviewText("");
      setRating(0);
    } catch (err) {
      console.error("Failed to add review", err);
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

export default DetailPage;
