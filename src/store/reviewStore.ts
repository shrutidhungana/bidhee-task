"use client";

import { create } from "zustand";
import type { Review } from "@/hooks/useReviews";

interface ReviewState {
  reviews: Review[];
  selectedReview?: Review;
  setReviews: (reviews: Review[]) => void;
  addReview: (review: Review) => void;
  setSelectedReview: (review: Review | undefined) => void;
}

export const useReviewStore = create<ReviewState>((set) => ({
  reviews: [],
  selectedReview: undefined,
  setReviews: (reviews) => set({ reviews }),
  addReview: (review) =>
    set((state) => ({ reviews: [review, ...state.reviews] })),
  setSelectedReview: (review) => set({ selectedReview: review }),
}));
