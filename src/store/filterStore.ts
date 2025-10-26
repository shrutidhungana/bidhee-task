import { create } from "zustand";

interface FilterState {
  page: number;
  limit: number;
  search: string;
  genre: string;
  language: string;
  sortField: string;
  sortOrder: string;
  setFilter: (key: keyof Omit<FilterState, "setFilter">, value: any) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  page: 1,
  limit: 10,
  search: "",
  genre: "",
  language: "",
  sortField: "rating",
  sortOrder: "desc",
  setFilter: (key, value) =>
    set((state) => ({
      ...state,
      [key]: value,
    })),
}));
