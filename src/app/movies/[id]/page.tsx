"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { useRouter } from "next/navigation";
import { useMovie } from "@/hooks/useMovie";
import { useMovieStore } from "@/store/movieStore";

interface DetailPageProps {
  params: {
    id: string;
  };
}

const DetailPage: React.FC<DetailPageProps> = ({ params }) => {
  const router = useRouter();
  const movieId = params.id;

  const { data: movie, isLoading, isError } = useMovie(movieId);
  const setMovie = useMovieStore((state) => state.setMovie);

  useEffect(() => {
    if (movie) setMovie(movie);
  }, [movie, setMovie]);

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
      {/* Navbar */}
      <Navbar title="Movie Details">
        <button
          onClick={() => router.push("/")}
          className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition"
        >
          Back to Dashboard
        </button>
      </Navbar>

      {/* Hero Section */}
      <main className="pt-24 px-6 space-y-10">
        <Hero
          title={movie.title}
          subtitle={(movie.genre || []).join(", ")}
          imageUrl={movie.posterUrl}
        />

        {/* Movie Details */}
        <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl p-8 space-y-6 transform transition-all duration-500 hover:scale-[1.01]">
          {/* Basic Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-gray-700">
            <div className="space-y-1">
              <h3 className="font-semibold">Director</h3>
              <p className="text-gray-900">{movie.director}</p>
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold">Year</h3>
              <p className="text-gray-900">{movie.year}</p>
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold">Runtime</h3>
              <p className="text-gray-900">{movie.runtime} min</p>
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold">Rating</h3>
              <p className="text-gray-900">{movie.rating} / 10</p>
            </div>
          </div>

          {/* Synopsis */}
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700 text-lg">Synopsis</h3>
            <p className="text-gray-800">{movie.synopsis}</p>
          </div>

          {/* Cast */}
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700 text-lg">Cast</h3>
            <p className="text-gray-800">{(movie.cast || []).join(", ")}</p>
          </div>

          {/* Reviews */}
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700 text-lg">Reviews</h3>
            <p className="text-gray-800">
              {movie.reviewCount} reviews, Average Rating:{" "}
              {movie.averageReviewRating} / 5
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetailPage;
