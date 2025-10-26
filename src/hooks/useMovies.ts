import { useQuery, UseQueryOptions } from "@tanstack/react-query";

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

export const useMovies = (params: QueryParams) => {
  // Only pass **plain objects** to queryKey
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
    staleTime: 1000 * 60 * 5, // 5 minutes
  };

  return useQuery(options);
};
