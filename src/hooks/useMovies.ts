"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

export interface Movie {
  id: number;
  title: string;
  language: string;
  year: number;
  genre: string[];
  rating: number;
  posterUrl: string;
}

interface QueryParams {
  page: number;
  limit: number;
  search: string;
  genre: string;
  language: string;
  sortField: string;
  sortOrder: string;
}

interface MoviesResponse {
  data: Movie[];
  total: number;
}

// Fetch movies
export const useMovies = (params: QueryParams) => {
  const queryKey: [
    string,
    number,
    number,
    string,
    string,
    string,
    string,
    string
  ] = [
    "movies",
    params.page,
    params.limit,
    params.search,
    params.genre,
    params.language,
    params.sortField,
    params.sortOrder,
  ];

  const options: UseQueryOptions<
    MoviesResponse,
    Error,
    MoviesResponse,
    typeof queryKey
  > = {
    queryKey,
    queryFn: async () => {
      const query = new URLSearchParams({
        page: params.page.toString(),
        limit: params.limit.toString(),
        search: params.search,
        genre: params.genre,
        language: params.language,
        sortField: params.sortField,
        sortOrder: params.sortOrder,
      }).toString();

      const res = await fetch(`/api/movies?${query}`);
      if (!res.ok) throw new Error("Failed to fetch movies");
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
  };

  return useQuery(options);
};

// Create movie
export const useCreateMovie = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (movie: Omit<Movie, "id">) => {
      const res = await fetch("/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "",
        },
        body: JSON.stringify(movie),
      });
      if (!res.ok) throw new Error("Failed to create movie");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["movies"] }),
  });
};

// Update movie
export const useUpdateMovie = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<Movie> }) => {
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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["movies"] }),
  });
};

// Delete movie
export const useDeleteMovie = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/movies/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-password": process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "",
        },
      });
      if (!res.ok) throw new Error("Failed to delete movie");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["movies"] }),
  });
};
