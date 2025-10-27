import { create } from "zustand";
import { MovieDetail } from "@/hooks/useMovie";

interface MovieDetailState {
  movie?: MovieDetail;
  setMovie: (movie: MovieDetail) => void;
  clearMovie: () => void;
}

export const useMovieStore = create<MovieDetailState>((set) => ({
  movie: undefined,
  setMovie: (movie) => set({ movie }),
  clearMovie: () => set({ movie: undefined }),
}));
