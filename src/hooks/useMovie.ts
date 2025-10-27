"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

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

// Fetch single movie
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

// Update single movie
export const useUpdateMovieDetail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: Partial<MovieDetail>;
    }) => {
      const res = await fetch(`/api/movies/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update movie");
      return res.json();
    },
    onSuccess: (_, { id }) =>
      queryClient.invalidateQueries({ queryKey: ["movie", id] }),
  });
};
