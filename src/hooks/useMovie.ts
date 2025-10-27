"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export interface MovieDetail {
  id: number;
  title: string;
  language: string;
  year: number;
  genre: string[];
  rating: number;
  director: string;
  runtime: number;
  synopsis: string;
  cast: string[];
  posterUrl: string;
  reviewCount: number;
  averageReviewRating: number;
}

export const useMovie = (
  id: string | number,
  options?: UseQueryOptions<MovieDetail, Error, MovieDetail>
) => {
  return useQuery<MovieDetail, Error>({
    queryKey: ["movie", id],
    queryFn: async () => {
      const res = await fetch(`/api/movies/${id}`);
      if (!res.ok) throw new Error("Failed to fetch movie details");
      return res.json();
    },
    staleTime: 1000 * 60 * 5, 
    ...options,
  });
};
